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
            replacerClass(classList, 'fa-volume-mute', 'fa-volume-up')
            item.muted = false;
        } else {
            replacerClass(classList, 'fa-volume-up', 'fa-volume-mute')
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
                        <i data-id="${this.id}" class="fas fa-volume-mute video-data__show-mute"></i>
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

let videoData = [];

function videoPlaylist(items) {
    items.forEach(item => {
        videoData.push(new Video(item))
    })
}

videoPlaylist(responseFromServer)