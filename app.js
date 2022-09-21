const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progressBar = $('.progress-bar')
const songCurrentTime = $('.current-time')
const songDurationTime = $('.duration-time')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'I Will Follow You',
            singer: 'Ricky Nelson',
            path: './assets/I-Will-Follow-You-Ricky-Nelson.mp3',
            image: './assets/Decca_Records_Rick_Nelson_1966.jpg',
        },
        {
            name: 'Bằng Lăng Nở Hoa',
            singer: 'Anh Rồng, G5R Squad',
            path: './assets/Bang Lang No Hoa - Anh Rong_ G5R Squad.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/6/8/2/5/6825cac216a2e2c5e54c183862ba6abd.jpg',
        },
        {
            name: 'Despacito',
            singer: 'Luis Fonsi,Daddy Yankee',
            path: './assets/Despacito - Luis Fonsi_ Daddy Yankee.mp3',
            image: './assets/100020.jpg',
        },
        {
            name: 'Cơn Mơ Băng Giá',
            singer: 'Bằng Kiều',
            path: './assets/Con-Mo-Bang-Gia-Bang-Kieu.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/b/0/3/0/b030d520467eaf28c7d7a0ec931d3e7d.jpg',
        },
        {
            name: 'Thất Tình',
            singer: 'Trịnh Đình Quang',
            path: './assets/That-Tinh-Trinh-Dinh-Quang.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/avatars/8/5/85b4710d31d2806e237269c1063f7358_1462333009.jpg',
        },
        {
            name: 'Thay Đổi',
            singer: 'LilWuyn',
            path: './assets/ThayDoi-LilWuyn.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/d/c/9/6/dc9603deb245f9ee8859f8e0da4041b7.jpg',
        },
        {
            name: 'Ngày Không Em',
            singer: 'Ưng Hoàng Phúc',
            path: './assets/NgayKhongEm-UngHoangPhuc.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/covers/b/9/b9a96698a5562872546c12b67548b96d_1287302097.jpg',
        },
        {
            name: 'Hy Vọng Mong Manh',
            singer: 'Trương Đan Huy',
            path: './assets/Hy-Vong-Mong-Manh-Truong-Dan-Huy.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_webp/cover/7/0/b/8/70b838854fd16dcb42f4c5b42047c485.jpg',
        },
        {
            name: 'Ảo Mộng Tình Yêu',
            singer: 'Cẩm Ly, Đan Trường',
            path: './assets/Ao-Mong-Tinh-Yeu-Cam-Ly-Dan-Truong.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/a/5/3/e/a53e95551cdc52a921e3872b2c68cc30.jpg',
        },
        {
            name: 'Gửi Ngàn Lời Yêu',
            singer: 'Tuấn Hưng',
            path: './assets/Gui-Ngan-Loi-Yeu-Tuan-Hung.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/covers/f/9/f9d26e35b927776aef3ac3b92a9a881a_1298350582.jpg',
        },
        {
            name: 'Tòng Phu',
            singer: 'Keyo',
            path: './assets/TongPhu-Keyo.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w480_r1x1_webp/cover/d/f/9/b/df9b187a2b0e565ebe5b6bd60bdef622.jpg',
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
      <div class="song">
      <div class="thumb"
          style="background-image: url('${song.image}')">
      </div>
      <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
      </div>
      <div class="option">
          <i class="fas fa-ellipsis-h"></i>
      </div>
  </div>
      `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    // define thêm thuộc tính của object app
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            },
        })
    },
    handleEvents: function () {
        const _this = this
        // Lấy cái width hiện tại của cd
        // Trừ đi số px khi oncroll
        // check xem kết quả có >0 không
        // chú ý: khi có kết quả thì gán lại cho cd.style.width chứ không phải là cdWidth, vif offsetWidth chỉ là read-only
        //  chú ý khi set kích thước cho width phải + 'px'
        const cdWidth = cd.offsetWidth

        // Xử lý CD quay

        const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000,
            iterations: Infinity,
        })

        cdThumbAnimate.pause()

        // Xử lý tiến độ bài hát thay đổi

        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime * 100) / audio.duration)
                progressBar.value = progressPercent
                progressBar.style.background = `linear-gradient(to right, #ff2a5f ${progressPercent}%, #ccc 0%)`

                // Xử lý tiến độ
                const minutesCurrent =
                    Math.floor(audio.currentTime / 60) <= 9
                        ? '0' + Math.floor(audio.currentTime / 60)
                        : Math.floor(audio.currentTime / 60)
                const secondsCurrent =
                    Math.floor(audio.currentTime - minutesCurrent * 60) <= 9
                        ? '0' + Math.floor(audio.currentTime - minutesCurrent * 60)
                        : Math.floor(audio.currentTime - minutesCurrent * 60)
                const minutesDuration =
                    Math.floor(audio.duration / 60) <= 9
                        ? '0' + Math.floor(audio.duration / 60)
                        : Math.floor(audio.duration / 60)
                const secondsDuration =
                    Math.floor(audio.duration - minutesDuration * 60) <= 9
                        ? '0' + Math.floor(audio.duration - minutesDuration * 60)
                        : Math.floor(audio.duration - minutesDuration * 60)
                songCurrentTime.innerText = minutesCurrent + ':' + secondsCurrent
                songDurationTime.innerText = minutesDuration + ':' + secondsDuration
            }
        }

        // Xử lý khi tua song
        progressBar.oninput = function (e) {
            console.log(e.target.value)
            const seekTime = (e.target.value * audio.duration) / 100
            audio.currentTime = seekTime
        }

        // Xử lý khi next song
        nextBtn.onclick = function (e) {
            e.stopPropagation()
            _this.currentIndex < _this.songs.length - 1 ? _this.currentIndex++ : (_this.currentIndex = 0)
            _this.loadCurrentSong()
            _this.render()
            audio.play()
        }

        // Xử lý khi prev song

        prevBtn.onclick = function (e) {
            e.stopPropagation()
            _this.currentIndex > 0 ? _this.currentIndex-- : (_this.currentIndex = _this.songs.length)
            _this.loadCurrentSong()
            _this.render()
            audio.play()
        }
        // Xử lý scroll
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = (newCdWidth > 0 ? newCdWidth : 0) / cdWidth
        }

        // Xử lý click play
        // khi chạy lần đầu isplaying là false,
        // thì lọt vào audio.play và chạy xuống onplay,
        // sau đó onclick lần nữa, nó sẽ kiểm tra lại isplay là true, thì nó lọt vào audio.pause
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Xử lý khi được play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Xử lý khi bị pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
    },
    loadCurrentSong: function () {
        if (this.currentSong) {
            heading.innerText = this.currentSong.name
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
            audio.src = this.currentSong.path
        }
    },
    start: function () {
        // định nghĩa thêm thuộc tính cho object
        this.defineProperties()
        // xử lý sự kiện
        this.handleEvents()

        // load baì hát hiện tại
        this.loadCurrentSong()
        // render ra DOM
        this.render()
    },
}

app.start()
