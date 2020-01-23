var img_counter = 0;

class GalleryController {
  constructor(){
    this.images = [];
    this.timer = 0;
    this.focusedImage = -1;
    this.photos_per_row;
  }

  loadGallery() {
    //Array of image sources
    let image_sources = ["./images/team/aaron.jpg",
                          "./images/team/andrew.jpg",
                          "./images/team/brandon.jpg",
                          "./images/team/jake.png",
                          "./images/team/jot.jpg",
                          "./images/team/kevintran.jpg",
                          "./images/team/lauren.jpg",
                          "./images/team/michael.jpg",
                          "./images/team/min.jpg",
                          "./images/team/pari.jpg",
                          "./images/team/phu.jpg"
                        ];

    let title_texts = ["Aaron Nguyen",
                        "Andrew Chiang",
                        "Brandon Luu",
                        "Jake Morenc",
                        "Navjot Singh",
                        "Kevin Huynh-Tran",
                        "Lauren Rudnick",
                        "Michael Aling",
                        "Min Dai",
                        "Pari Patel",
                        "Peter Tran"
                      ];

    let desc_texts = ["Mechanical Engineering",
                        "Mechanical Engineering",
                        "Electrical Engineering",
                        "Mechanical Engineering",
                        "Electrical Engineering",
                        "Electrical Engineering",
                        "Mechanical Engineering",
                        "Mechanical Engineering",
                        "Mechanical Engineering",
                        "Electrical Engineering",
                        "Mechanical Engineering"
                      ];

    let date_texts = ["2018-2019",
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
      let container = document.createElement("div");
      container.setAttribute('class', "gallery-img-container");
      container.setAttribute('id', `img${index}-container`);
      gallery_elem.append(container);
      let elem = document.createElement("img");
      let tempObj = new GalleryImage(elem, value); //value = img_src
      tempObj.loadInfo(title_texts[index], desc_texts[index], date_texts[index]);

      elem.setAttribute('class', "gallery-img");

      elem.setAttribute('src', value);
      elem.setAttribute('id', `img${index}`);

      images.push(tempObj); //global array
      container.append(elem);
    });

    this.loadResponsiveGallery();

    this.loadGalleryImageHover();

    let gallery = this;
    $(window).resize(function(){
      gallery.loadResponsiveGallery();
    });
  }

  loadResponsiveGallery() {
    let container = $(".gallery");
    let container_width = container.width();
    let photos_per_row;
    //let window_ratio = $(window).height() / $(window).width();
    let window_ratio = $(window).width() / window.screen.width;
    if (window_ratio >= 0.9) {
      photos_per_row = 4;
      $(".content").css("font-size", "");
      $(".gallery-img-text").css("font-size", "");
    } else if (window_ratio >= 0.6){
      photos_per_row = 3;
      $(".content").css("font-size", "20px");
      $(".gallery-img-text").css("font-size", "");
    } else if (window_ratio >= 0.4){
      photos_per_row = 2;
      $(".content").css("font-size", "20px");
      $(".gallery-img-text").css("font-size", "");
    } else if (window_ratio >= 0.25){
      photos_per_row = 1;
      $(".content").css("font-size", "15px");
      $(".gallery-img-text").css("font-size", "2em");
    }
    console.log(window_ratio);
    this.photos_per_row = photos_per_row;
    let images = this.images;
    let img_width = (container_width / photos_per_row) - (photos_per_row * parseInt($(".gallery-img-container").css("margin-left"), 10));
    let img_height = img_width;

    $.each(images, function(index, value) {
      images[index].updateSize(img_width, img_height);
    });

  }


  loadGalleryImageHover() {
    let gc = this;
    let img_containers = $(".gallery-img-container");
    img_containers.each(function(index){
      $(this).hover(function(){
        let container = $(this);
        let img = $(`#img${index}`);
        let img_text = $(`#img${index}-text`);
        container.css("cursor", "pointer");
        img.css("filter", "blur(2px)");
        img_text.css("opacity", "1");
      }, function(){
        if(gc.photos_per_row != 1){
          let container = $(this);
          let img = $(`#img${index}`);
          let img_text = $(`#img${index}-text`);
          container.css("cursor", "");
          img.css("filter", "");
          img_text.css("opacity", "0");
        }
      });
      if(gc.photos_per_row == 1){
        $(`#img${index}-text`).css("opacity", "1");
      }
    });
  }


  focusOnImage(id) {
    if(id != -1){
      let container = $(window);
      let gc = this;
      let images = this.images;
      this.focusedImage = id;
      images[id].showing = true;
      $(".gallery").css("height", container.height() - $(".navbar").height() - (2 * parseInt($(".content_title").css("margin-top"), 10)));
      images[id].updateSize("auto", container.height() - $(".navbar").height() - (2 * parseInt($(".content_title").css("margin-top"), 10)));
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
      console.log(this.focusedImage);
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

      gc.loadResponsiveGallery();

      this.hidereturnButton();
    }
  }

  showReturnButton(){
    let gal_return = $(".gallery-return");
    gal_return.css("opacity", "1");
    gal_return.css("z-index", "999");

    let gallery = $(".gallery");
    let y = gallery.position().top;
    gal_return.css("top", y);
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
    let container = document.getElementById(`img${this.img_id}-container`);
    //Add wrapper
    let text_wrapper = document.createElement("div");
    text_wrapper.setAttribute('class', "gallery-img-text");
    text_wrapper.setAttribute('id', `img${this.img_id}-text`);
    $(container).append(text_wrapper);

    //Add title
    let title_div = document.createElement("div");
    title_div.setAttribute('class', "gallery-img-title");
    title_div.setAttribute('id', `img${this.img_id}-title`);
    title_div.appendChild(document.createTextNode(title_text));
    this.title_elem = title_div;
    text_wrapper.append(title_div);

    //Add description
    let desc_div = document.createElement("div");
    desc_div.setAttribute('class', "gallery-img-desc");
    desc_div.setAttribute('id', `img${this.img_id}-desc`);
    desc_div.appendChild(document.createTextNode(desc_text));
    this.desc_elem = desc_div;
    text_wrapper.append(desc_div);

    //Add date
    let date_div = document.createElement("div");
    date_div.setAttribute('class', "gallery-img-date");
    date_div.setAttribute('id', `img${this.img_id}-date`);
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
      $(this.elem).parent().css("height", `${height}px`);
    } else {
      $(this.elem).css("width", `${width}px`);
      $(this.elem).css("height", `${height}px`);
      $(this.elem).parent().css("height", `${height}px`);
    }
  }
}

function initGallery(){
  var gc = new GalleryController;
  gc.loadGallery();
}
