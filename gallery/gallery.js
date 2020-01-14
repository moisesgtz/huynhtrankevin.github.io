var img_counter = 0;

class GalleryController {
  constructor(){
    this.images = [];
    this.timer = 0;
    this.focusedImage = -1;
  }

  loadGallery() {
    //Array of image sources
    let image_sources = ["../images/gallery/pres_img1.jpg",
                          "../images/gallery/pres_img2.jpg",
                          "../images/gallery/pres_img3.jpg",
                          "../images/gallery/legtrek_3dmodel_bottomangle.png",
                          "../images/gallery/legtrek_3dmodel_topangle.png",
                          "../images/gallery/legtrek_3dmodel_side.png",
                          "../images/gallery/legtrek_3dmodel_sit2stand.gif",
                          "../images/gallery/legtrek_3dmodel_sitting.png",
                          "../images/gallery/legtrek_3dmodel_standing.png",
                          "../images/gallery/legtrek_3dmodel_walking.png",
                          "../images/gallery/legtrek_realmodel1.gif",
                          "../images/gallery/legtrek_realmodel2.gif",
                          "../images/gallery/legtrek_realmodel3.gif"
                        ];

    let title_texts = ["Electronics Enclosure",
                        "Full Device",
                        "Battery Enclosure",
                        "3D Model Bottom Angle",
                        "3D Model Top Angle",
                        "3D Model Side Angle",
                        "3D Model Sit-to-Stand",
                        "3D Model Sitting",
                        "3D Model Standing",
                        "3D Model Walking",
                        "Test Demo 1",
                        "Test Demo 2",
                        "Test Demo 3"
                      ];

    let desc_texts = ["Electronics Enclosure",
                        "Full Device",
                        "Battery Enclosure",
                        "3D Model Bottom Angle",
                        "3D Model Top Angle",
                        "3D Model Side Angle",
                        "3D Model Sit-to-Stand",
                        "3D Model Sitting",
                        "3D Model Standing",
                        "3D Model Walking",
                        "Test Demo 1",
                        "Test Demo 2",
                        "Test Demo 3"
                      ];

    let date_texts = ["2020",
                        "2020",
                        "2020",
                        "2018-2019",
                        "2018-2019",
                        "2018-2019",
                        "2018-2019",
                        "2018-2019",
                        "2018-2019",
                        "2018-2019",
                        "2018-2019",
                        "2018-2019",
                        "2018-2019"
                      ];

    //Create DOM img element, create GalleryImage (linked to DOM element), append to page
    let gallery_elem = $(".gallery");
    let images = this.images;
    $.each(image_sources, function(index, value) {
      let elem = document.createElement("img");
      let tempObj = new GalleryImage(elem, value); //value = img_src
      tempObj.loadInfo(title_texts[index], desc_texts[index], date_texts[index]);

      elem.setAttribute('class', "gallery-img");

      elem.setAttribute('src', value);
      elem.setAttribute('name', `img${tempObj.id}`);

      images.push(tempObj); //global array
      gallery_elem.append(elem);
    });

    this.loadResponsiveGallery();

    this.loadGalleryImageClick();
    this.loadGalleryImageHover();

    $(window).resize(function(gallery){
      gallery.loadResponsiveGallery();
    }, this);
  }

  loadResponsiveGallery() {
    let container = $(".content");
    let container_width = container.width();
    let photos_per_row;
    let window_ratio = $(window).height() / $(window).width();
    if (window_ratio > 1) {
      photos_per_row = 1;
    } else {
      photos_per_row = 4;
    }
    let images = this.images;
    console.log(container_width);
    let img_width = (container_width / photos_per_row) - (photos_per_row * parseInt($(".gallery-img").css("margin-left"), 10));
    let img_height = img_width;

    $.each(images, function(index, value) {
      images[index].updateSize(img_width, img_height);
    });

  }

  loadGalleryImageClick() {
    let controller = this;
    let images = this.images;
    var gc = this;
    $.each(images, function(index, value) {
      let img_elem = $(images[index].elem);
      img_elem.click(function(){
        gc.focusOnImage(images[index].img_id);
      });
    });

    let gal_return = $(".gallery-return");
    gal_return.click(function(){
      gc.focusOnImage(-1);
    });

    gal_return.hover(function(){
      $(".gallery-return svg polyline").each(function(){
        $(this).attr("stroke", "#1e4d78");
        $(this).attr("stroke-width", "5");
      });
      $(".gallery-return-text").css("color", "#1e4d78");
    }, function(){
      $(".gallery-return svg polyline").each(function(){
        $(this).attr("stroke", "#9cc2e5");
        $(this).attr("stroke-width", "2");
      });
      $(".gallery-return-text").css("color", "#9cc2e5");
    });
  }

  loadGalleryImageHover() {

  }


  focusOnImage(id) {
    if(id != -1){
      let container = $(window);
      let gc = this;
      let images = this.images;
      this.focusedImage = id;
      images[id].showing = true;
      $(".gallery").css("height", container.height() - $(".navbar").height() - (2 * parseInt($(".content_title").css("margin-top"), 10)));

      let window_ratio = $(window).height() / $(window).width();
      if (window_ratio > 1) {
        images[id].updateSize($(".content").width(), "auto");
        let img_height = $(images[id].elem).height();
        let gal_y = ($(window).height() / 2) + (img_height / 2)
        $(".gallery-return").css("left", "50vw");
        $(".gallery-return").css("top", `${gal_y}px`);
        $(".gallery-return").css("transform", "translateX(-50%)");
        console.log(gal_y);
      } else {
        images[id].updateSize("auto", container.height() - $(".navbar").height() - (2 * parseInt($(".content_title").css("margin-top"), 10)));
      }

      $(images[id].elem).addClass("active-image");
      $(".content_title").css("display", "none");
      $.each(images, function(index, value) {
        let img_elem = $(images[index].elem);
        if(index != id){
          $(images[index].elem).css("display", "none");
        }
        $(images[id].elem).off("click");
        $(images[id].elem).hover(function(){
          $(images[id].elem).css("cursor", "auto");
        });
      });

      //Show return button
      this.showReturnButton();
    } else {
      let container = $(".content");
      let gc = this;
      let images = this.images;
      images[this.focusedImage].showing = false;
      $(".gallery").css("height", "");
      $(images[this.focusedImage].elem).removeClass("active-image");
      $(".content_title").css("display", "");
      this.focusedImage = id;
      $.each(images, function(index, value) {
        let img_elem = $(images[index].elem);
        if(index != id){
          $(images[index].elem).css("display", "");
        }
        $(images[index].elem).hover(function(){
          $(images[index].elem).css("cursor", "");
        });
      });

      gc.loadGalleryImageClick();
      gc.loadResponsiveGallery();

      this.hidereturnButton();
    }
  }

  showReturnButton(){
    let gal_return = $(".gallery-return");
    gal_return.css("opacity", "1");
    gal_return.css("z-index", "999");

    let window_ratio = $(window).height() / $(window).width();
    if (window_ratio < 1) {
      let gallery = $(".gallery");
      let y = gallery.position().top;
      gal_return.css("top", y);
    }
  }

  hidereturnButton(){
    let gal_return = $(".gallery-return");
    gal_return.css("opacity", "0");
    gal_return.css("z-index", "-1");
  }
}

class GalleryImage {
  constructor(elem, image_src, file_type) {
    this.img_id = img_counter++;
    this.src = image_src;
    this.elem = elem;
    this.showing = false;
    this.title_elem;
    this.desc_elem;
    this.date_elem;
    this.file_type = file_type;
    this.width = 0;
    this.height = 0;
  }

  loadInfo(title_text, desc_text, date_text){
    //Add wrapper
    let text_wrapper = document.createElement("div");
    text_wrapper.setAttribute('class', "gallery-img-text");
    text_wrapper.setAttribute('name', `img${this.img_id}-text`);
    $(".gallery").append(text_wrapper);

    //Add title
    let title_div = document.createElement("div");
    title_div.setAttribute('class', "gallery-img-title");
    title_div.setAttribute('name', `img${this.img_id}-title`);
    title_div.appendChild(document.createTextNode(title_text));
    this.title_elem = title_div;
    text_wrapper.append(title_div);

    //Add description
    let desc_div = document.createElement("div");
    desc_div.setAttribute('class', "gallery-img-desc");
    desc_div.setAttribute('name', `img${this.img_id}-desc`);
    desc_div.appendChild(document.createTextNode(desc_text));
    this.desc_elem = desc_div;
    text_wrapper.append(desc_div);

    //Add date
    let date_div = document.createElement("div");
    date_div.setAttribute('class', "gallery-img-date");
    date_div.setAttribute('name', `img${this.img_id}-date`);
    date_div.appendChild(document.createTextNode(date_text));
    this.date_elem = date_div;
    text_wrapper.append(date_div);

  }

  updateSize(width, height) {
    this.width = width;
    this.height = height;
    if(width == "auto"){
      $(this.elem).css("width", `auto`);
      $(this.elem).css("height", `${height}px`);
    } else if (height == "auto"){
      $(this.elem).css("width", `${width}px`);
      $(this.elem).css("height", `auto`);
    } else {
      $(this.elem).css("height", `${height}px`);
      $(this.elem).css("width", `${width}px`);
    }
  }
}

function initGallery(){
  var gc = new GalleryController;
  gc.loadGallery();
}
