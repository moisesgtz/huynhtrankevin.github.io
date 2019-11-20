function applyBodyCSS(navbar_height) {
  $("body").css("margin", `${navbar_height + 30}px 0px 0px 0px`);
}

function navBarListener(){
  let navbar = $(".navbar");
  let options = $(".navbar_option");
  let atTop = false;

  applyBodyCSS(navbar.height());

  options.each(function(){
    $(this).hover(function(){
      $(this).css("cursor", "pointer");
    }, function(){
      $(this).css("cursor", "auto");
    });
  });

  $(".navbar_logo").click(function(){
    window.location.href = "./index.html";
  });

  $(window).scroll(function(){
    var windowTop = $(window).scrollTop();
    var windowBot = windowTop + $(window).height();

    var navbarTop = navbar.offset().top;
    var navbarBot = navbarTop + navbar.height();

    if ((windowTop <= navbar.height())) {
      navbar.css("background-color", "#1e4d78");
      $(".navbar_logo_leg").get(0).setAttribute('fill', '#9cc2e5');
      $(".navbar_logo_trek").get(0).setAttribute('fill','#ffffff');
      options.css("color", "white");
    } else {
      navbar.css("background-color", "white");
      $(".navbar_logo_leg").get(0).setAttribute('fill', '#1e4d78');
      $(".navbar_logo_trek").get(0).setAttribute('fill','#9cc2e5');
      options.css("color", "#1e4d78");
    }
  });

  $(window).scroll(0);
}

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

function newsletterResizeListener(){
  let field_email = $("#mce-EMAIL");
  let field_submit = $("#mc-embedded-subscribe");
  $(window).resize(function(){
    let height = field_email.height();
    field_submit.height(height);
  });
  $(window).trigger("resize");
}

function pageLoad(){
  logoSVGCreator();
  navBarListener();
  newsletterResizeListener();

  console.log("Site Created By: Steven Huynh-Tran (https://www.linkedin.com/in/stevenht)");
}
