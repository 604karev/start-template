// import image from './images/lazy.png';


import $ from 'jquery'
import slick from 'slick-carousel'
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import './sass/main.sass'


const sliderControls = $('.slider-controls');
const source = document.querySelector('.source');
const player = document.querySelector('.video');
const video = player.querySelector('video');
const progress = player.querySelector('#progress');

$('.slides').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    appendDots: sliderControls,
    prevArrow: $('#prev'),
    nextArrow: $('#next'),
});
$('.slides')
    .on('afterChange', function (event, slick, currentSlide,) {
        $('.pagination-counter__item').html(`0${currentSlide + 1}`);
    });

$('.video-slider__wrapper').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    appendDots: $('.video-slider__controls'),
    prevArrow: $('.video-slider__button-wrapper_left'),
    nextArrow: $('.video-slider__button-wrapper_right'),
});

$('.video-slider__wrapper')
    .on('afterChange', function (event, slick, currentSlide,) {
        video.pause();
        source.setAttribute('src', `assets/video/video${currentSlide}.mp4`);
        video.poster = `assets/video/poster${currentSlide}.jpg`;
        video.load();
    });


const rangeInputs = document.querySelectorAll('input[type="range"]');
const ranges = player.querySelectorAll('.video-controls__input');

const volume = player.querySelector('#volume');
const playButton = player.querySelector('.play-button');
const videoButton = player.querySelector('.video-player__button');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullscreenButton = player.querySelector('.fullscreen-button');


const togglePlay = () => {
    player.classList.toggle('pause');
    const method = video.paused ? 'play' : 'pause';
    video[method]();
};

// progres.style.background = `linear-gradient(to right, #710707 ${+progres.value}%, #C4C4C4 ${+progres.value + 1}%)`;

function timeUpdateInputChange(e) {
    let percent = Math.floor((video.currentTime / video.duration) * 100);
    progress.style.backgroundSize = percent + '% 100%';
    progress.value = percent;

}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleProgressUpdate() {
    video[this.name] = this.value;
    if (this.name === 'progress') {
        timeUpdateInputChange()
    }
    if (this.name === 'volume') {
        volume.style.backgroundSize = volume.value * 100 + '% 100%'
    }

}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

rangeInputs.forEach(input => {
    input.addEventListener('change', timeUpdateInputChange)
});

function keyPress(e) {
    e.preventDefault();
    if (e.keyCode === 32 || e.keyCode === 75) {
        togglePlay()

    }
    if (e.keyCode === 70) {
        if (document.fullscreen) {
            exitFS()
        }
        requestFullscreen()
    }
    if (e.keyCode === 77) {
        video.muted = !video.muted
    }
    if (e.keyCode === 39 || e.shiftKey && e.keyCode === 190) {
        video.playbackRate += .5
    }
    if (e.keyCode === 37 || e.shiftKey && e.keyCode === 188) {
        video.playbackRate -= .5
    }
    if (e.keyCode === 76) {
        video.currentTime += 10
    }
    if (e.keyCode === 74) {
        video.currentTime -= 10
    }

}

function requestFullscreen() {
    if (video.requestFullScreen) {
        video.requestFullScreen();
    } else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
}

function exitFS() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

const artGallery = document.querySelector('.art-gallery');
const imageCount = 15;
const imgArray = [];
function initComparisons() {
    var x, i;
    /*find all elements with an "overlay" class:*/
    x = document.getElementsByClassName("img-compare__wrap_overlay");
    for (i = 0; i < x.length; i++) {
        /*once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function:*/
        compareImages(x[i]);
    }

    function compareImages(img) {
        var slider, img, clicked = 0, w, h;
        w = img.offsetWidth;
        h = img.offsetHeight;
        img.style.width = (w / 2) + "px";
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-compare__slider");
        img.parentElement.insertBefore(slider, img);
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchstop", slideFinish);

        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }

        function slideFinish() {
            clicked = 0;
        }

        function slideMove(e) {
            var pos;
            if (clicked === 0) return false;
            pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }

        function getCursorPos(e) {
            var a, x = 0;
            e = e || window.event;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            img.style.width = x + "px";
            slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
        }
    }
}

const createImage = (src) => {
    const div = document.createElement('div');
    div.classList.add('art-gallery__item');
    const img = document.createElement('img');
    img.classList.add('art-gallery__img');
    img.src = `assets/img/galery/galery${src}.jpg`;
    img.alt = `galery${src}`;
    div.append(img);
    return div
};
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

for (let i = 1; i <= imageCount; i++) {
    imgArray.push(createImage(i))
}

const shuffledArray = shuffle(imgArray);
shuffledArray.forEach(item => artGallery.append(item));


async function render() {
    const subHeader = document.createElement('h2');
    subHeader.innerHTML = 'This elements was created by js';
    const myImage = await createImage(image);
    document.body.appendChild(subHeader);
    document.body.appendChild(myImage);
}

skipButtons.forEach(button => button.addEventListener('click', skip));
video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', timeUpdateInputChange);
video.addEventListener('loadedmetadata', timeUpdateInputChange);
ranges.forEach(range => range.addEventListener('change', handleProgressUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleProgressUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
window.addEventListener('keydown', keyPress);
fullscreenButton.addEventListener('click', requestFullscreen);
videoButton.addEventListener('click', togglePlay);
window.addEventListener('load', initComparisons);

const button = document.querySelector('.btn-submit');
const buttonModal = document.querySelector('.btn-primary_modal');
const modal = document.querySelector('.modal');
const sBooking = document.getElementById('booking');
const html = document.querySelector('html');
const close = document.querySelector('.close');

const toggleModal = (e) => {
    e.preventDefault();
    html.classList.add('active');
};
const closeModal = (e) => {
    sBooking.classList.remove('visible');
    html.classList.remove('active');
};

buttonModal.addEventListener('click', function (e) {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;

    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    const xInside = 87;
    const yInside = 25;
    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500)
});


button.addEventListener('click', toggleModal);
close.addEventListener('click', closeModal);

const toggleVisible = () => {
    if (html.classList.contains('active'))
        sBooking.classList.add('visible');
};


modal.addEventListener('transitionend', toggleVisible);



