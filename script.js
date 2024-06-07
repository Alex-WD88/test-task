let links = document.querySelectorAll('.blog_wrapper .link_blog');
let blogWrapper = document.querySelector('.blog_wrapper');
let spacer = document.querySelector('.spacer');
let currentIndex = 0; 
let isScrolling = false; 
let startY;

links[0].classList.add('active');

blogWrapper.addEventListener('wheel', handleScroll, false);
blogWrapper.addEventListener('touchstart', (e) => {
  startY = e.touches[0].clientY;
}, false);
blogWrapper.addEventListener('touchmove', (e) => {
  e.preventDefault();
  handleScroll({deltaY: startY - e.touches[0].clientY});
}, false);

function handleScroll(e) {
  if (!isScrolling) {
    isScrolling = true; 

    if (e.deltaY < 0) {
      links[currentIndex].classList.remove('active');

      if (currentIndex > 0) {
        currentIndex--;
      }
    }

    if (e.deltaY > 0) {
      links[currentIndex].classList.remove('active');

      if (currentIndex < links.length - 1) {
        currentIndex++;
      }
    }

    links[currentIndex].classList.add('active');

    (currentIndex === 0 ? spacer : links[currentIndex]).scrollIntoView({
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false; 
    }, 500); 
  }
}


window.onload = function() {
    let imageContainer = document.getElementById('imageContainer');
    let images = imageContainer.getElementsByTagName('img');

    let imageWidth = images[0].clientWidth;
    let speed = [2, -2, 2]; // Скорость прокрутки для каждого изображения

    // Создаем копии изображений для бесконечной прокрутки
    for (let i = 0; i < images.length; i++) {
        let clone = images[i].cloneNode();
        imageContainer.appendChild(clone);
    }

    // Функция для обновления позиции изображений
    function updatePositions() {
        for (let i = 0; i < images.length; i++) {
            images[i].style.left = (images[i].offsetLeft - speed[i]) + 'px';

            // Если изображение полностью вышло за границы контейнера, перемещаем его обратно
            if (speed[i] > 0 && images[i].offsetLeft < -imageWidth) {
                images[i].style.left = imageWidth + 'px';
            } else if (speed[i] < 0 && images[i].offsetLeft > imageWidth) {
                images[i].style.left = -imageWidth + 'px';
            }
        }
    }

    // Проверяем, загружены ли все изображения
    let imagesLoaded = 0;
    for (let i = 0; i < images.length; i++) {
        images[i].onload = function() {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                // Если все изображения загружены, начинаем обновлять позиции изображений каждые 20 миллисекунд
                setInterval(updatePositions, 20);
            }
        }
    }
}
