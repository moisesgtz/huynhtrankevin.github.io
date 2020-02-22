function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    var partialThreshold = 250;
    var isPartiallyVisible = elemTop < docViewBottom - partialThreshold;
    var isVisible = (elemBottom <= docViewBottom) && (elemTop >= docViewTop);
    return (isPartiallyVisible);
}

function loadContainerAnimations(){
  let containers = $(".content_container");
  $(window).scroll(function(){
    containers.each(function(){
      if(isScrolledIntoView($(this).get(0))){
        $(this).addClass("content_fadein");
      }
    })
  });
}
