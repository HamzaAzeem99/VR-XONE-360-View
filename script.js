/* =========================================================
   VR XONE V2
   Keyboard + Mouse + Gamepad
   Category System
========================================================= */


/* =========================================================
   EXPERIENCES
========================================================= */

const experiences = [

    {
        id: "kKgt_azwT0M",
        title: "Jurassic World Dinosaur Roller Coaster 🦖🎢",
        description:
            "Take a thrilling roller coaster ride through Jurassic World, surrounded by massive dinosaurs and prehistoric adventures.   ",
        category: "Adventure"
    },



    {
        id: "njSffibRets",
        title: "The Nun House",
        description:
            "Step into a mysterious environment filled with darkness and unknown places.",
        category: "Horror"
    },


    {
        id: "Dv32Zr0ofs",
        title: "Cyberpunk Night City 🌃",
        description:
            "Explore neon-lit streets, futuristic buildings, and a stunning cyberpunk cityscape at night.",
        category: "Sci-Fi"
    },


    {
        id: "X_qfq_xGVwE",
        title: "Titanoboa Snake Chase on Snake Island 🐍",
        description:
            "A thrilling encounter with a giant Titanoboa as the chase begins on the mysterious Snake Island.",
        category: "Fantasy"
    },


    {
        id: "sPyAQQklc1s",
        title: "Lions: Kings of the Wild 🦁",
        description:
            "Get up close with powerful lions as they roam, hunt, and live in their natural African habitat.",
        category: "Nature"
    },


    {
        id: "YOUR_MYSTERY_VIDEO_ID",
        title: "Unknown Dimension",
        description:
            "Enter a mysterious world and discover what is hidden around you.",
        category: "Mystery"
    },


    {
        id: "YhFqUohoSh0",
        title: "Jurassic World: Blue 🦖",
        description:
            "Meet Blue, the legendary Velociraptor, and experience the thrilling world of Jurassic World through an unforgettable dinosaur adventure.",
        category: "Action"
    },
    {
        id: "hjCfwuRazOI",
        title: "Sea Eater Monster in the Dark Ocean 🌊👹",
        description:
            "A mysterious sea monster is spotted in the dark ocean while a small boat ventures through the deep waters.",
        category: "Action"
    },


    {
        id: "rrlT-7RbO7o",
        title: "Apollo 11: Moon Space Mission 🚀🌕",
        description:
            "Journey to the Moon with Apollo 11 and experience the historic space mission from launch to lunar exploration.",
        category: "Virtual Tours"
    }

];


/* =========================================================
   SETTINGS
========================================================= */

const categories = [

    "All",

    "Horror",

    "Adventure",

    "Sci-Fi",

    "Fantasy",

    "Nature",

    "Mystery",

    "Action",

    "Virtual Tours"

];


const sensitivity = 0.35;

const gamepadSensitivity = 2.5;

const deadZone = 0.15;


/* =========================================================
   PLAYER
========================================================= */

let player = null;

let youtubeReady = false;

let currentIndex = 0;


/* =========================================================
   CAMERA
========================================================= */

let yaw = 0;

let pitch = 0;

let fov = 100;


/* =========================================================
   MOUSE DRAG
========================================================= */

let dragging = false;

let startX = 0;

let startY = 0;

let startYaw = 0;

let startPitch = 0;


/* =========================================================
   GAMEPAD
========================================================= */

let connectedGamepad = null;

let gamepadLoop = null;


/* =========================================================
   ACTIVE CATEGORY
========================================================= */

let activeCategory = "All";


/* =========================================================
   DOM
========================================================= */

const cardsContainer =
    document.getElementById(
        "categorySections"
    );


const categoryTabs =
    document.getElementById(
        "categoryTabs"
    );


const experienceCount =
    document.getElementById(
        "experienceCount"
    );


const viewerTitle =
    document.getElementById(
        "viewerTitle"
    );


const infoTitle =
    document.getElementById(
        "infoTitle"
    );


const infoDescription =
    document.getElementById(
        "infoDescription"
    );


const infoCategory =
    document.getElementById(
        "infoCategory"
    );


const loading =
    document.getElementById(
        "loading"
    );


const dragLayer =
    document.getElementById(
        "dragLayer"
    );


const dragMessage =
    document.getElementById(
        "dragMessage"
    );


const cameraYaw =
    document.getElementById(
        "cameraYaw"
    );


const gamepadDot =
    document.getElementById(
        "gamepadDot"
    );


const gamepadStatus =
    document.getElementById(
        "gamepadStatus"
    );


/* =========================================================
   CATEGORY TABS
========================================================= */

function createCategoryTabs() {

    categoryTabs.innerHTML = "";


    categories.forEach(category => {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "category-tab";


        if (
            category === activeCategory
        ) {

            button.classList.add(
                "active"
            );

        }


        button.textContent =
            category.toUpperCase();


        button.addEventListener(
            "click",
            () => {

                activeCategory =
                    category;


                createCategoryTabs();

                renderCategorySections();

            }
        );


        categoryTabs.appendChild(
            button
        );

    });

}


/* =========================================================
   CATEGORY SECTIONS
========================================================= */

function renderCategorySections() {

    cardsContainer.innerHTML = "";


    let filtered =
        experiences;


    if (
        activeCategory !== "All"
    ) {

        filtered =
            experiences.filter(
                item =>
                    item.category ===
                    activeCategory
            );

    }


    experienceCount.textContent =
        filtered.length;


    if (!filtered.length) {

        cardsContainer.innerHTML = `

            <div class="empty-category">

                NO EXPERIENCES AVAILABLE
                IN THIS CATEGORY

            </div>

        `;

        return;

    }


    /*
        When ALL is selected,
        create separate sections.
    */

    if (
        activeCategory === "All"
    ) {

        categories
            .filter(
                category =>
                    category !== "All"
            )
            .forEach(category => {

                const categoryItems =
                    experiences.filter(
                        item =>
                            item.category ===
                            category
                    );


                if (
                    !categoryItems.length
                ) {

                    return;

                }


                createCategoryBlock(
                    category,
                    categoryItems
                );

            });

    } else {

        createCategoryBlock(
            activeCategory,
            filtered
        );

    }

}


/* =========================================================
   CREATE CATEGORY BLOCK
========================================================= */

function createCategoryBlock(
    category,
    items
) {

    const block =
        document.createElement(
            "div"
        );


    block.className =
        "category-block";


    block.innerHTML = `

        <div class="category-block-header">

            <h3>
                ${category}
            </h3>

            <span class="category-number">
                ${items.length}
                EXPERIENCES
            </span>

        </div>

        <div class="cards-container"></div>

    `;


    const container =
        block.querySelector(
            ".cards-container"
        );


    items.forEach(
        experience => {

            const originalIndex =
                experiences.indexOf(
                    experience
                );


            const card =
                createExperienceCard(
                    experience,
                    originalIndex
                );


            container.appendChild(
                card
            );

        }
    );


    cardsContainer.appendChild(
        block
    );

}


/* =========================================================
   CREATE CARD
========================================================= */

function createExperienceCard(
    experience,
    index
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "experience-card";


    card.dataset.index =
        index;


    if (
        index === currentIndex
    ) {

        card.classList.add(
            "active"
        );

    }


    card.innerHTML = `

        <div class="card-image">

            <img
                src="https://img.youtube.com/vi/${experience.id}/maxresdefault.jpg"
                alt="${experience.title}"
                loading="lazy"
            >

            <div class="play-circle">

                <svg viewBox="0 0 24 24">

                    <path
                        d="M8 5v14l11-7z"
                    />

                </svg>

            </div>

        </div>


        <div class="card-content">

            <div class="card-category">

                ${experience.category}

            </div>


            <h3 class="card-title">

                ${experience.title}

            </h3>


            <p class="card-description">

                ${experience.description}

            </p>

        </div>

    `;


    card.addEventListener(
        "click",
        () => {

            loadExperience(index);

        }
    );


    return card;

}


/* =========================================================
   YOUTUBE API
========================================================= */

window.onYouTubeIframeAPIReady =
    function () {

        console.log(
            "YouTube API Ready"
        );


        if (
            !experiences.length
        ) {

            return;

        }


        player =
            new YT.Player(
                "player",
                {

                    width: "100%",

                    height: "100%",

                    videoId:
                        experiences[0].id,

                    playerVars: {

                        autoplay: 0,

                        controls: 1,

                        rel: 0,

                        playsinline: 1,

                        enablejsapi: 1,

                        origin:
                            window.location.origin

                    },

                    events: {

                        onReady:
                            onPlayerReady,

                        onStateChange:
                            onPlayerStateChange,

                        onError:
                            onPlayerError

                    }

                }
            );

    };


/* =========================================================
   PLAYER READY
========================================================= */

function onPlayerReady() {

    youtubeReady = true;


    hideLoading();


    updateExperienceInfo(
        0
    );


    check360();


    console.log(
        "VR XONE Player Ready"
    );

}


/* =========================================================
   CHECK 360
========================================================= */

function check360() {

    if (!player) return;


    try {

        const properties =
            player.getSphericalProperties();


        console.log(
            "360° Properties:",
            properties
        );


        if (
            properties &&
            Object.keys(
                properties
            ).length
        ) {

            console.log(
                "360 camera available."
            );

        } else {

            console.warn(
                "This video may not be a 360° video."
            );

        }

    } catch (error) {

        console.warn(
            "360 API error:",
            error
        );

    }

}


/* =========================================================
   PLAYER STATE
========================================================= */

function onPlayerStateChange(
    event
) {

    if (
        event.data ===
        YT.PlayerState.BUFFERING
    ) {

        showLoading();

    }


    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {

        hideLoading();

    }

}


/* =========================================================
   PLAYER ERROR
========================================================= */

function onPlayerError(
    event
) {

    console.error(
        "YouTube Error:",
        event.data
    );


    hideLoading();

}


/* =========================================================
   LOAD EXPERIENCE
========================================================= */

function loadExperience(
    index
) {

    if (
        !youtubeReady ||
        !player ||
        typeof player.loadVideoById !==
        "function"
    ) {

        console.warn(
            "Player not ready."
        );

        return;

    }


    const experience =
        experiences[index];


    if (!experience) return;


    currentIndex =
        index;


    showLoading();


    updateExperienceInfo(
        index
    );


    resetView();


    player.loadVideoById({

        videoId:
            experience.id,

        startSeconds:
            0

    });


    updateActiveCards();


    document
        .querySelector(
            ".viewer-section"
        )
        .scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

}


/* =========================================================
   UPDATE INFO
========================================================= */

function updateExperienceInfo(
    index
) {

    const experience =
        experiences[index];


    if (!experience) return;


    viewerTitle.textContent =
        experience.title;


    infoTitle.textContent =
        experience.title;


    infoDescription.textContent =
        experience.description;


    infoCategory.textContent =
        experience.category
            .toUpperCase();

}


/* =========================================================
   ACTIVE CARD
========================================================= */

function updateActiveCards() {

    document
        .querySelectorAll(
            ".experience-card"
        )
        .forEach(card => {

            const index =
                Number(
                    card.dataset.index
                );


            card.classList.toggle(
                "active",
                index === currentIndex
            );

        });

}


/* =========================================================
   LOADING
========================================================= */

function showLoading() {

    loading.classList.remove(
        "hidden"
    );

}


function hideLoading() {

    setTimeout(
        () => {

            loading.classList.add(
                "hidden"
            );

        },
        350
    );

}


/* =========================================================
   CAMERA UPDATE
========================================================= */

function updateCamera() {

    if (
        !player ||
        typeof player.setSphericalProperties !==
        "function"
    ) {

        return;

    }


    yaw =
        ((yaw % 360) + 360) % 360;


    pitch =
        Math.max(
            -90,
            Math.min(
                90,
                pitch
            )
        );


    try {

        player.setSphericalProperties({

            yaw: yaw,

            pitch: pitch,

            roll: 0,

            fov: fov

        });

    } catch (error) {

        console.warn(
            "Camera update failed:",
            error
        );

    }


    cameraYaw.textContent =
        `YAW ${String(
            Math.round(yaw)
        ).padStart(3, "0")}°`;

}


/* =========================================================
   MOUSE DRAG
   DIRECT — NO SMOOTHING
========================================================= */

dragLayer.addEventListener(
    "pointerdown",
    event => {

        if (
            !youtubeReady ||
            !player
        ) {

            return;

        }


        dragging = true;


        dragLayer.classList.add(
            "dragging"
        );


        startX =
            event.clientX;


        startY =
            event.clientY;


        startYaw =
            yaw;


        startPitch =
            pitch;


        dragLayer.setPointerCapture(
            event.pointerId
        );


        if (dragMessage) {

            dragMessage.classList.add(
                "hidden"
            );

        }

    }
);


/* =========================================================
   MOUSE MOVE
========================================================= */

dragLayer.addEventListener(
    "pointermove",
    event => {

        if (!dragging) return;


        const deltaX =
            event.clientX -
            startX;


        const deltaY =
            event.clientY -
            startY;


        yaw =
            startYaw -
            deltaX * sensitivity;


        pitch =
            startPitch -
            deltaY * sensitivity;


        updateCamera();

    }
);


/* =========================================================
   STOP DRAG
========================================================= */

function stopDrag(event) {

    dragging = false;


    dragLayer.classList.remove(
        "dragging"
    );


    try {

        dragLayer.releasePointerCapture(
            event.pointerId
        );

    } catch (error) { }

}


dragLayer.addEventListener(
    "pointerup",
    stopDrag
);


dragLayer.addEventListener(
    "pointercancel",
    stopDrag
);


/* =========================================================
   RESET
========================================================= */

function resetView() {

    yaw = 0;

    pitch = 0;

    fov = 100;


    updateCamera();

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.target.tagName ===
            "INPUT" ||
            event.target.tagName ===
            "TEXTAREA"
        ) {

            return;

        }


        const step = 7;


        switch (event.key) {

            case "ArrowLeft":

                yaw -= step;

                break;


            case "ArrowRight":

                yaw += step;

                break;


            case "ArrowUp":

                pitch += step;

                break;


            case "ArrowDown":

                pitch -= step;

                break;


            case "r":
            case "R":

                resetView();

                return;


            case " ":

                event.preventDefault();

                togglePlay();

                return;


            default:

                return;

        }


        updateCamera();

    }
);


/* =========================================================
   PLAY / PAUSE
========================================================= */

function playVideo() {

    if (
        player &&
        typeof player.playVideo ===
        "function"
    ) {

        player.playVideo();

    }

}


function pauseVideo() {

    if (
        player &&
        typeof player.pauseVideo ===
        "function"
    ) {

        player.pauseVideo();

    }

}


function togglePlay() {

    if (!player) return;


    const state =
        player.getPlayerState();


    if (
        state ===
        YT.PlayerState.PLAYING
    ) {

        pauseVideo();

    } else {

        playVideo();

    }

}


/* =========================================================
   BUTTONS
========================================================= */

document
    .getElementById(
        "playBtn"
    )
    .addEventListener(
        "click",
        playVideo
    );


document
    .getElementById(
        "pauseBtn"
    )
    .addEventListener(
        "click",
        pauseVideo
    );


document
    .getElementById(
        "resetBtn"
    )
    .addEventListener(
        "click",
        resetView
    );


document
    .getElementById(
        "fullscreenBtn"
    )
    .addEventListener(
        "click",
        () => {

            const viewer =
                document.querySelector(
                    ".viewer-wrapper"
                );


            if (
                !document.fullscreenElement
            ) {

                viewer.requestFullscreen();

            } else {

                document.exitFullscreen();

            }

        }
    );


/* =========================================================
   GAMEPAD CONNECT
========================================================= */

window.addEventListener(
    "gamepadconnected",
    event => {

        connectedGamepad =
            event.gamepad;


        gamepadDot.classList.add(
            "connected"
        );


        gamepadStatus.textContent =
            `${event.gamepad.id
                .slice(0, 28)
                .toUpperCase()}`;


        console.log(
            "Gamepad connected:",
            event.gamepad
        );


        startGamepadLoop();

    }
);


/* =========================================================
   GAMEPAD DISCONNECT
========================================================= */

window.addEventListener(
    "gamepaddisconnected",
    event => {

        connectedGamepad = null;


        gamepadDot.classList.remove(
            "connected"
        );


        gamepadStatus.textContent =
            "GAMEPAD NOT CONNECTED";


        console.log(
            "Gamepad disconnected"
        );

    }
);


/* =========================================================
   GAMEPAD LOOP
========================================================= */

function startGamepadLoop() {

    if (gamepadLoop) return;


    function loop() {

        readGamepad();


        gamepadLoop =
            requestAnimationFrame(
                loop
            );

    }


    gamepadLoop =
        requestAnimationFrame(
            loop
        );

}


/* =========================================================
   GAMEPAD INPUT
========================================================= */

function readGamepad() {

    if (!connectedGamepad) {

        const pads =
            navigator.getGamepads();


        connectedGamepad =
            Array
                .from(pads)
                .find(
                    gamepad =>
                        gamepad
                );

    }


    if (!connectedGamepad) return;


    /*
        Refresh gamepad object
    */

    const pads =
        navigator.getGamepads();


    const gamepad =
        pads[
        connectedGamepad.index
        ];


    if (!gamepad) return;


    /*
        Standard Gamepad:

        axes[0] = left/right
        axes[1] = up/down
    */

    let horizontal =
        gamepad.axes[0] || 0;


    let vertical =
        gamepad.axes[1] || 0;


    /*
        Dead zone
    */

    if (
        Math.abs(horizontal) <
        deadZone
    ) {

        horizontal = 0;

    }


    if (
        Math.abs(vertical) <
        deadZone
    ) {

        vertical = 0;

    }


    /*
        Camera
    */

    if (
        horizontal !== 0 ||
        vertical !== 0
    ) {

        yaw +=
            horizontal *
            gamepadSensitivity;


        pitch -=
            vertical *
            gamepadSensitivity;


        updateCamera();

    }


    /*
        A button
    */

    if (
        gamepad.buttons[0] &&
        gamepad.buttons[0].pressed
    ) {

        playVideo();

    }


    /*
        B button
    */

    if (
        gamepad.buttons[1] &&
        gamepad.buttons[1].pressed
    ) {

        resetView();

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

createCategoryTabs();

renderCategorySections();

console.log(
    "VR XONE V2 initialized."
);