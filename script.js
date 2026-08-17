const crackBtn = document.getElementById('crackBtn');
const gachaMachine = document.getElementById('gachaMachine');
const machineBg = document.getElementById('machineBg');
const gachaBall = document.getElementById('gachaBall');
const revealBox = document.getElementById('revealBox');
const revealImg = document.getElementById('revealImg');
const songNameText = document.getElementById('songName');

// โหลดไฟล์เสียงหมุนตู้
const spinAudio = new Audio('spin.wav');
spinAudio.preload = 'auto';

let currentMusic = null;
let isSpinning = false;
let musicTimeout = null;

// ฐานข้อมูลเพลง 4 สี (ชื่อไฟล์ตรงกับรูปเป๊ะๆ)
const gachaItems = [
    {
        title: "opens arm",
        audio: "song1.mp3",
        ballImg: "ball_white.PNG",
        revealImg: "reveal_white.PNG"
    },
    {
        title: "better",
        audio: "song2.mp3",
        ballImg: "ball_neonblue.png",
        revealImg: "reveal_neonblue.jpg" // อันนี้เป็น jpg นะคะ
    },
    {
        title: "gold chain",
        audio: "song3.mp3",
        ballImg: "ball_neonpink.png",
        revealImg: "reveal_neonpink.PNG"
    },
    {
        title: "君のまま",
        audio: "song4.mp3",
        ballImg: "ball_black.png",
        revealImg: "reveal_black.PNG"
    }
];

crackBtn.addEventListener('click', () => {
    if (isSpinning) return; 
    isSpinning = true;

    // สุ่มของรางวัล
    const randomIndex = Math.floor(Math.random() * gachaItems.length);
    const selectedItem = gachaItems[randomIndex];

    // เซ็ตภาพบอลและข้อมูลล่วงหน้า
    gachaBall.src = selectedItem.ballImg;
    revealImg.src = selectedItem.revealImg;
    songNameText.innerText = selectedItem.title;

    // เตรียมไฟล์เพลง
    if (currentMusic) {
        currentMusic.pause();
    }
    currentMusic = new Audio(selectedItem.audio);
    currentMusic.preload = 'auto';

    // เริ่มแอนิเมชัน
    spinAudio.currentTime = 0;
    spinAudio.play().catch(e => console.log(e));
    crackBtn.classList.add('spinning');

    setTimeout(() => {
        gachaMachine.classList.add('shaking');
    }, 200);

    setTimeout(() => {
        gachaMachine.classList.remove('shaking');
        gachaBall.classList.remove('center-stage', 'ball-shake');
        gachaBall.classList.add('drop');

        setTimeout(() => {
            gachaBall.classList.add('center-stage');

            setTimeout(() => {
                gachaBall.classList.add('ball-shake');

                setTimeout(() => {
                    // ปิดบอลกลิ้ง เปิดไข่เด้ง
                    gachaBall.classList.remove('center-stage', 'ball-shake', 'drop');
                    gachaBall.style.opacity = '0';
                    
                    // ซ่อนตู้และปุ่ม (เหลือแต่พื้นดำ)
                    machineBg.classList.add('hidden');
                    crackBtn.classList.add('hidden');

                    revealBox.classList.add('pop');
                    
                    // เล่นเพลง
                    currentMusic.currentTime = 0;
                    currentMusic.play().catch(e => console.log(e));

                    // ปิดอัตโนมัติเมื่อครบ 30 วินาที
                    clearTimeout(musicTimeout);
                    musicTimeout = setTimeout(() => {
                        resetGacha();
                    }, 30000);

                }, 900);
            }, 600);
        }, 500);
    }, 600);
});

// กดที่หน้าจอเพื่อปิดก่อน 30 วินาที
revealBox.addEventListener('click', () => {
    resetGacha();
});

function resetGacha() {
    clearTimeout(musicTimeout);
    if (currentMusic) {
        currentMusic.pause();
    }
    
    revealBox.classList.remove('pop');
    
    // โชว์ตู้กลับมา
    machineBg.classList.remove('hidden');
    crackBtn.classList.remove('hidden', 'spinning');

    setTimeout(() => {
        isSpinning = false;
    }, 300);
}
