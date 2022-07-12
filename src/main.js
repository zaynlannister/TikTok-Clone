import './style.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

// Helpers

function replacerClass(className, oldToken, newToken) {
    className.replace(oldToken, newToken);
}

// Components

const responseFromServer = [
    {
        id: 1,
        author: 'unknown',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, reprehenderit.',
        src: 'https://data-1.utreon.com/v/ZD/Qx/ZD/o_07kA1CWgI/o_07kA1CWgI_original.mp4'
    },
    {
        id: 2,
        author: 'unknown',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, reprehenderit.',
        src: 'https://data-1.utreon.com/v/ND/Zj/Yz/O6_rFv74Ozk/O6_rFv74Ozk_480p.mp4'
    },
    {
        id: 3,
        author: 'unknown',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, reprehenderit.',
        src: 'https://data-1.utreon.com/v/MD/Nl/Nz/Sd8Bwk-G2UQ/Sd8Bwk-G2UQ_original.mp4'
    },
    {
        id: 4,
        author: 'unknown',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, reprehenderit.',
        src: 'https://data-1.utreon.com/v/ZD/hi/ZT/86f7lbMF7Qg/86f7lbMF7Qg_1080p.mp4'
    },
]

class Video {
    constructor(props) {
        this.id = props.id;
        this.author = props.author;
        this.description = props.description;
        this.src = props.src;
        this.likes = 0;
    }

    setPauseOrPlay(classList, item) {
        if (item.paused) {
            replacerClass(classList,'fa-play', 'fa-pause')
            item.play()
        } else {
            replacerClass(classList,'fa-pause', 'fa-play')
            item.pause()
        }
    }

    setMuteOrUnmute(classList, item) {
        if (item.muted) {
            replacerClass(classList, 'fa-volume-xmark', 'fa-volume-high')
            item.muted = false;
        } else {
            replacerClass(classList, 'fa-volume-high', 'fa-volume-xmark')
            item.muted = true;
        }
    }

    getTemplate() {
        return `
                <div class="video-data">
                    <div class="video-data__author">
                        <div class="video-data__author-image"></div>
                        <div class="video-data__author-title">
                            <div class="video-data__title-author">${this.author}</div>
                            <div class="video-data__title-description">${this.description}</div>
                        </div>
                        <div class="video-data__author-button">
                            <button>Подписаться</button>
                        </div>
                    </div>
                    <div class="video-data__show">
                        <video id="${this.id}" width="400px" height="500px" muted autoplay
                               src="${this.src}"></video>
                        <i data-id="${this.id}" class="fas fa-pause video-data__show-play__pause"></i>
                        <i data-id="${this.id}" class="fas fa-volume-xmark video-data__show-mute"></i>
                    </div>
                    <div class="video-data__actions">
                        <div data-id="${this.id}" class="video-data__actions-block video-data__actions-likes">
                            <i class="fas fa-heart"></i>
                            <div class="video-data__actions-likes-amount">0</div>
                        </div>
                        <div class="video-data__actions-block video-data__actions-comments">
                            <i class="fas fa-comment-dots"></i>
                            <div class="video-data__actions-comments-amount">0</div>
                        </div>
                        <div class="video-data__actions-block video-data__actions-share">
                            <i class="fas fa-share"></i>
                            <div class="video-data__actions-shares-amount">0</div>
                        </div>
                    </div>
                </div>
            `
    }

    getItemId() {
        return this.id
    }
}

// Business Logic

function checkClassList(className, currentVideo, item) {
    if (className[2] === 'video-data__show-play__pause') {
        item.setPauseOrPlay(className, currentVideo)
    } else if (className[2] === 'video-data__show-mute') {
        item.setMuteOrUnmute(className, currentVideo)
    }
}

function findClickedVideo(target, dataId, videoList, videoPlayer) {
    if (target) {
        videoList.forEach(item => {
            if (item.id === parseInt(dataId)) {
                let needVideo = Array.from(videoPlayer).find(item => {
                    return item.id === dataId
                });
                checkClassList(target.classList, needVideo, item)
            }
        })
    }
}

function clickSubscribeButton(button, buttonParent) {
    button.addEventListener('click', () => {
        if (buttonParent.classList.contains('active')) {
            button.innerHTML = 'Подписаться'
            buttonParent.classList.remove('active')
        } else {
            button.innerHTML = 'Ты подписан'
            buttonParent.classList.add('active')
        }
    })
}

function openCommentsButton(item) {
    let commentMenu = document.querySelector('.comments');

    commentMenu.classList.toggle('active')
}

function renderComment(value, container) {
    container.innerHTML += `
            <div class="comments-content">
                <div class="comments-content__data">
                    <div class="comments-content__img"></div>
                    <div class="comments-content__title">
                        <div class="comments-content__title-name">*Name*</div>
                        <div class="comments-content__title-text">${value}</div>
                    </div>
                </div>
                <div class="comments-content__likes">
                    <i class="comments-content__likes-button far fa-heart"></i>
                    <div class="comments-content__likes-amount">0</div>
                </div>
            </div>
        `
}

function addLikeButton(element, checkText) {
    if (typeof element === 'object' && checkText === 'videoButton') {
        element.addEventListener('click', el => {
            let amountOfLikes = element.childNodes[4]
            amountOfLikes.innerHTML++
        })
    } else if (checkText === 'commentButton') {
        element.innerHTML++
    }
}

let videoData = [];

function videoPlaylist(element, items) {
    const DOMElement = document.querySelector(element);

    items.forEach(item => {
        videoData.push(new Video(item));
    })

    function renderVideos() {
        videoData.forEach(item => {
            DOMElement.innerHTML += item.getTemplate();
        })
    }

    renderVideos()

    let videoPlayer = document.querySelectorAll('.video-data__show video');
    let subscribeButtons = document.querySelectorAll('.video-data__author-button button');
    let likeButton = document.querySelectorAll('.video-data__actions-likes');
    let commentButtons = document.querySelectorAll('.video-data__actions-comments');

    // listeners

    DOMElement.addEventListener('click', el => {
        let target = el.target.closest('svg');
        let dataId = (target) ? target.getAttribute('data-id'): false;

        findClickedVideo(target, dataId, videoData, videoPlayer)
    })

    videoPlayer.forEach(video => {
        video.addEventListener('ended', () => {
            video.play()
        })
    })

    subscribeButtons.forEach(button => {
        let buttonParent = button.parentNode;

        clickSubscribeButton(button, buttonParent)
    })

    commentButtons.forEach(item => {
        item.addEventListener('click', () => {
            openCommentsButton(item)
        })
    })

    let sendTextButton  = document.querySelector('.comments-actions__button');
    let commentsInput  = document.querySelector('.comments-actions__input input');
    let commentContainer = document.querySelector('.comments-container');

    sendTextButton.addEventListener('click', () => {
        let inputValue = commentsInput.value;
        renderComment(inputValue, commentContainer)
        commentsInput.value = ''
    })

    commentContainer.addEventListener('click', el => {
        let target = el.target.tagName;
        let amountOfLikes = el.target.parentNode.querySelector('.comments-content__likes-amount')

        if (target === 'svg') {
            addLikeButton(amountOfLikes, 'commentButton')
        }
    })
}

videoPlaylist(".video", responseFromServer)