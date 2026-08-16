const crackBtn = document.getElementById('crackBtn');
const gachaMachine = document.getElementById('gachaMachine');
const gachaBall = document.getElementById('gachaBall');
const revealBox = document.getElementById('revealBox');

// โหลดไฟล์เสียง
const spinAudio = new Audio('spin.wav');
spinAudio.preload = 'auto';

const musicAudio = new Audio('song1.mp3'); // 🎵 เปลี่ยนเป็นชื่อไฟล์เพลงที่จะเทส
musicAudio.preload = 'auto';

let isSpinning = false;

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

                // 7. สปริงเด้งเปิดไข่ (Spring Bounce Pop!) + เล่นเพลง
                setTimeout(() => {
                    gachaBall.classList.remove('center-stage', 'ball-shake', 'drop');
                    gachaBall.style.opacity = '0';
                    
                    revealBox.classList.add('pop');
                    
                    // เล่นเพลงทดสอบ
                    musicAudio.currentTime = 0;
                    musicAudio.play().catch(e => console.log(e));

                    // จบเพลง 15 วิ ปิดอัตโนมัติ
                    setTimeout(() => {
                        musicAudio.pause();
                    }, 15000);

                }, 900);

            }, 600);

        }, 500);

    }, 600);
});

// กดที่การ์ดผลลัพธ์เพื่อปิดเพลงและรอหมุนใหม่ได้ทันที
revealBox.addEventListener('click', () => {
    musicAudio.pause();
    revealBox.classList.remove('pop');
    crackBtn.classList.remove('spinning');
    setTimeout(() => {
        isSpinning = false;
    }, 300);
});