$(function() {
  var items = $( "#sortable" ).sortable({
  	deactivate: function (e, ui) {
  		// when item is dropped
  		let { length, prevObject, context, ...childrens } = items.children()
  		if (childrens) {
  			Object.values(childrens)
  				.map((children, index) => {
  					api.update(children.getAttribute('id'), { index })
  				})
	  	}	  	
  	}
	});
  $( "#sortable" ).disableSelection();
  $('textarea').each(function () {
	  this.setAttribute('style', 'height:' + (this.scrollHeight || 50) + 'px;overflow-y:hidden;');
	}).on('input', function (e) {
		let input = $(this);
		$("#desc-counter").text(input.val().length)
		if(input.val().length >= 300) {
			e.preventDefault()
			input.val(input.val());
			this.style.border = '1px solid red';
			return false;
		}
		this.style.border = '1px solid black';
	  this.style.height = 'auto';
	  this.style.height = (this.scrollHeight) + 'px';
	});
});