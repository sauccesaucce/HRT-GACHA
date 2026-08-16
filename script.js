const crackBtn = document.getElementById('crackBtn');
const gachaMachine = document.getElementById('gachaMachine');
const gachaBall = document.getElementById('gachaBall');

let isSpinning = false;

crackBtn.addEventListener('click', () => {
    if (isSpinning) return; 
    isSpinning = true;

    // 1. หมุนปุ่มคันโยก
    crackBtn.classList.add('spinning');

    // 2. ตู้เริ่มเขย่า
    setTimeout(() => {
        gachaMachine.classList.add('shaking');
    }, 200);

    // 3. หยุดหมุน + ลูกบอลหล่น
    setTimeout(() => {
        gachaMachine.classList.remove('shaking');
        gachaBall.classList.remove('center-stage', 'ball-shake');
        gachaBall.classList.add('drop');

        // 4. ลูกบอลพุ่งมากลางจอ
        setTimeout(() => {
            gachaBall.classList.add('center-stage');

            // 5. ลูกบอลเขย่าดุ๊กดิ๊ก
            setTimeout(() => {
                gachaBall.classList.add('ball-shake');

                // 🔄 รีเซ็ตกลับไปรอหมุนใหม่ (เทสระบบ 3.5 วินาที)
                setTimeout(() => {
                    resetGacha();
                }, 3500);

            }, 600);

        }, 500);

    }, 600);
});

function resetGacha() {
    gachaBall.classList.remove('center-stage', 'ball-shake', 'drop');
    gachaBall.style.opacity = '0';
    crackBtn.classList.remove('spinning');
    
    setTimeout(() => {
        isSpinning = false;
    }, 400);
}
const spinAudio = new Audio('spin.wav');