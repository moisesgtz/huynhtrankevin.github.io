function applyBodyCSS(navbar_height) {
  $("body").css("margin", `${navbar_height + 30}px 0px 0px 0px`);
}

function navBarListener(){
  let navbar = $(".navbar");
  let logo = $(".navbar_logo");
  let options = $(".navbar_option");
  let atTop = false;

  applyBodyCSS(navbar.height());

  $(".navbar_logo").click(function(){
    window.location.href = "/";
  });

  /*
  navbar.hover(function(){ //MAXIMIZE, essentially reset
    navbar.css("height", "");
    logo.css("padding", "");
    logo.css("height", "");
    options.css("font-size", "");
    navbar.css("opacity", "");
  }, function (){ //MINMIZE
    if($(window).scrollTop() > navbar.height()) { //ONLY MINIMIZE IF NOT AT THE TOP
      navbar.css("height", "5%");
      navbar.css("padding", "10px 0px");
      logo.css("padding", "10px");
      logo.css("height", "1em");
      options.css("font-size", "0.8em");
      navbar.css("opacity", "0.75");
    }
  });
  */

  //Change navbar color on scroll
  $(window).scroll(function(){
    var windowTop = $(window).scrollTop();
    var windowBot = windowTop + $(window).height();

    var navbarTop = navbar.offset().top;
    var navbarBot = navbarTop + navbar.height();

    if ((windowTop <= navbar.height())) { //TOP
      navbar.css("height", "");
      logo.css("padding", "");
      logo.css("height", "");
      options.css("font-size", "");
      navbar.css("opacity", "");
      options.css("color", "");
      logo.css("filter", "");
      navbar.css("background-color", "");
    } else { //NOT TOP
      options.css("color", "white");
      //logo.css("filter", "brightness(0) invert(1)");
      navbar.css("background-color", "black");
      //Code to resize and fade navbar
      /*
      navbar.css("height", "5%");
      navbar.css("padding", "10px 0px");
      logo.css("padding", "10px");
      logo.css("height", "1em");
      options.css("font-size", "0.8em");
      navbar.css("opacity", "0.75");
      */
    }
  });

  $(window).scroll(0);
}

/*
function logoSVGCreator(){
  let navbar = $(".navbar");
  let height = navbar.height();
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", 200);
  svg.setAttribute("x", 0);
  svg.setAttribute("height", height);
  svg.setAttribute("class", "navbar_logo");

  let svgtext_1 = document.createElementNS(svg.namespaceURI, "text");
  svgtext_1.setAttribute('x',0);
  svgtext_1.setAttribute('y',0);
  svgtext_1.setAttribute('fill','#9cc2e5');
  svgtext_1.textContent = "LEG";
  svgtext_1.setAttribute("class", "navbar_logo_leg");
  svg.appendChild(svgtext_1);
  (navbar.get(0)).appendChild(svg);

  let svgtext_2 = document.createElementNS(svg.namespaceURI, "text");
  svgtext_1_width = svgtext_1.getBBox().width - 10;
  svgtext_2.setAttribute('x',svgtext_1_width);
  svgtext_2.setAttribute('y',0);
  svgtext_2.setAttribute('fill','#ffffff');
  svgtext_2.textContent = "Trek";
  svgtext_2.setAttribute("class", "navbar_logo_trek");
  svg.appendChild(svgtext_2);
  (navbar.get(0)).appendChild(svg);

}
*/

function newsletterResizeListener(){
  let field_email = $("#mce-EMAIL");
  let field_submit = $("#mc-embedded-subscribe");
  $(window).resize(function(){
    field_submit.css("height", `${field_email.height()}px`);
  });
  $(window).trigger("resize");
}

function pageLoad(){
  //If NOT main page
  if(!($("#mission").length)){
    applyBodyCSS($(".navbar").height());
  }
  newsletterResizeListener();

  console.log("Site Created By: Steven Huynh-Tran (https://www.linkedin.com/in/stevenht)");
}
