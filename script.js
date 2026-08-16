const crackBtn = document.getElementById('crackBtn');
const gachaMachine = document.getElementById('gachaMachine');
const machineBg = document.getElementById('machineBg');
const gachaBall = document.getElementById('gachaBall');
const revealBox = document.getElementById('revealBox');

// โหลดไฟล์เสียง
const spinAudio = new Audio('spin.wav');
spinAudio.preload = 'auto';

const musicAudio = new Audio('song1.mp3');
musicAudio.preload = 'auto';

let isSpinning = false;
let musicTimeout = null;

crackBtn.addEventListener('click', () => {
    if (isSpinning) return; 
    isSpinning = true;

    // 1. เล่นเสียงหมุนตู้
    spinAudio.currentTime = 0;
    spinAudio.play().catch(e => console.log(e));

    // 2. หมุนคันโยก
    crackBtn.classList.add('spinning');

    // 3. ตู้เขย่า
    setTimeout(() => {
        gachaMachine.classList.add('shaking');
    }, 200);

    // 4. บอลหล่น
    setTimeout(() => {
        gachaMachine.classList.remove('shaking');
        gachaBall.classList.remove('center-stage', 'ball-shake');
        gachaBall.classList.add('drop');

        // 5. บอลพุ่งมากลางจอ
        setTimeout(() => {
            gachaBall.classList.add('center-stage');

            // 6. บอลสั่นเตรียมระเบิด
            setTimeout(() => {
                gachaBall.classList.add('ball-shake');

                // 7. สปริงเด้งเปิดไข่ + ฉากหลังจาง 40% + เล่นเพลง 30 วิ
                setTimeout(() => {
                    gachaBall.classList.remove('center-stage', 'ball-shake', 'drop');
                    gachaBall.style.opacity = '0';
                    
                    machineBg.classList.add('dimmed');
                    crackBtn.classList.add('dimmed');

                    revealBox.classList.add('pop');
                    
                    // เล่นเพลง
                    musicAudio.currentTime = 0;
                    musicAudio.play().catch(e => console.log(e));

                    // ปิดเสียงอัตโนมัติเมื่อครบ 30 วินาที
                    clearTimeout(musicTimeout);
                    musicTimeout = setTimeout(() => {
                        musicAudio.pause();
                    }, 30000);

                }, 900);

            }, 600);

        }, 500);

    }, 600);
});

// กดที่การ์ดเพื่อปิด และรีเซ็ตระบบพร้อมหมุนรอบใหม่
revealBox.addEventListener('click', () => {
    clearTimeout(musicTimeout);
    musicAudio.pause();
    
    revealBox.classList.remove('pop');
    machineBg.classList.remove('dimmed');
    crackBtn.classList.remove('dimmed', 'spinning');

    setTimeout(() => {
        isSpinning = false;
    }, 300);
});