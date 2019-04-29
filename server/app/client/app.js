var apiUrl = `/api/v1/`;

function httpRequest(url, method, callback, body, isJSON) {				
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.onload = function () {
		callback(xhr);
	}
	xhr.onerror = function (e) {
		console.log(e);
	};
	if(isJSON) {
		xhr.setRequestHeader("Content-Type", "application/json");
	}
	xhr.send(body);
}

let globalitem;

function toggleForm(modal, itemId, itemDescription, itemImageUrl) {
	$('#overlay').toggleClass('dn');
	$('#overlay').toggleClass('flex');
	globalitem = itemId;
	switch (modal) {
		case 'new':
			$('#description').val('')			
			$('#itemImage').attr('src', '')
			$('#newItemForm').toggle();
			$('#submit').text('Create')
			$("#desc-counter").text(0)
			break;
		case 'edit':
			$('#description').val(itemDescription)			
			$('#itemImage').attr('src', itemImageUrl);
			$('#newItemForm').toggle();
			$('#submit').text('Save')
			$("#desc-counter").text(itemDescription && itemDescription.length)
			break;
		case 'confirmDelete':
			$('#confirmDelete').toggle();
			break;
		default:
			break;
	}
}

function confirmDelete() {
	api.delete(globalitem);
}

function update() {
	let data = {
		description: $('#description').val()
	};
	api.update(globalitem, data);
	api.get();
	toggleForm('edit')
}

function renderImage (e) {
	let input = e.target;
	if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
        	var img = new Image();      
            img.src = e.target.result;

            img.onload = function () {
                var w = this.width;
                var h = this.height;
                if(w === 320 && h === 320) {
                	$('#itemImage').attr('src', e.target.result).css({ display: 'block' });
                	$('#imageError').text('')
                } else {
                	$('#imageError').text('Image size must be 320x320 pixels.').css({ color: 'red' });
                	$('#file').val('')
                }
            }            
        }

        reader.readAsDataURL(input.files[0]);
    }		
};

var api = {
	get: function() {
		httpRequest(`${apiUrl}items`, 'GET', function (xhr) {
			try {
				let items = JSON.parse(xhr.response);
				items = items.sort((a,b) => a.index - b.index);
				if(items.length === 0) {
					$('#sortable').html(`
						<h2 class="tc">This list is empty. :(</h2>
					`);
					$('#count').text('0');
					return;
				}
				$('#count').text(items.length);
				$('#sortable').html(
					items.map((item) =>
						`
							<li class="bg-white" id="${item.id}">
							  <img src="${item.imageUrl}" alt="item image" onerror="this.style.display = 'none'"/>
							  <p>${item.description}</p>
							  <div class="flex" id="options">
							  	<button onclick="toggleForm('edit', '${item.id}', '${item.description}', '${item.imageUrl}')">edit</button>
							  	<button onclick="toggleForm('confirmDelete', '${item.id}')">delete</button>
							  </div>
							</li>
						`)
				);
			} catch (e) {
				console.log(e)
			}
		});
	},
	post: function() {
		let data = {
			description: $('#description').val()
		};
		httpRequest(`${apiUrl}items`, 'POST', function (xhr) {
			try {
				api.get();
				$('#description').val('')
				toggleForm('new');
				api.uploadImage(xhr);
			} catch (e) {
				console.log(e);
			}
		}, JSON.stringify(data), true);
	},
	update: function(itemId, data) {
		httpRequest(`${apiUrl}items/${itemId}`, 'PUT', function (xhr) {
			api.uploadImage(xhr);
		}, JSON.stringify(data), true);
	},
	delete: function(itemId) {
		httpRequest(`${apiUrl}items/${itemId}`, 'DELETE', function (xhr) {
			try {
				api.get();
				globalitem = '';
				toggleForm('confirmDelete');
			} catch (e) {
				console.log(e);
			}
		});
	},
	uploadImage: function (xhr) {
		if(xhr.status.toString().includes('2')) {
			let response = JSON.parse(xhr.response);
			let fileInput = $('#file')['0'];
			if(fileInput.files && fileInput.files[0]) {
				var formData = new FormData();
				formData.append('file', fileInput.files[0]);

				httpRequest(`${apiUrl}images/upload/${response.id}`, 'POST', function (xhr) {
					try {
						api.get();
						$('#file').val('')
					} catch (e) {
						console.log(e);
					}
				}, formData);
			}
		}
	}
};

api.get();