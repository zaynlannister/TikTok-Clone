import './style.css'


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

    setPauseOrPlay(item) {
        if (item.paused) {
            item.play()
        } else {
            item.pause()
        }
    }

    setMuteOrUnmute(item) {
        if (item.muted) {
            item.muted = false;
        } else {
            item.muted = true;
        }
    }

    getTemplate() {

    }
}

let videoData = [];

const video1 = new Video({
    id: 4,
    author: 'unknown',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, reprehenderit.',
    src: 'https://data-1.utreon.com/v/ZD/hi/ZT/86f7lbMF7Qg/86f7lbMF7Qg_1080p.mp4'
})

console.log(video1)