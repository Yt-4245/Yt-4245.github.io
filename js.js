/* =====================================================
   Fake Windows Manager
   ===================================================== */

(() => {

    const windows = document.querySelectorAll(".fake-window");

    let highestZIndex = 10;


    /*
     * 给每个窗口添加拖动功能
     */
    windows.forEach((win) => {

        const titlebar = win.querySelector(".window-titlebar");

        if (!titlebar) {
            return;
        }


        let isDragging = false;

        let startMouseX = 0;
        let startMouseY = 0;

        let startWindowX = 0;
        let startWindowY = 0;


        /* =================================================
           鼠标按下
           ================================================= */

        titlebar.addEventListener("mousedown", (event) => {

            /*
             * 只允许鼠标左键
             */
            if (event.button !== 0) {
                return;
            }


            isDragging = true;


            startMouseX = event.clientX;
            startMouseY = event.clientY;


            /*
             * 获取当前窗口的位置
             */
            const rect = win.getBoundingClientRect();

            const desktopRect =
                document
                    .getElementById("desktop")
                    .getBoundingClientRect();


            startWindowX =
                rect.left - desktopRect.left;

            startWindowY =
                rect.top - desktopRect.top;


            /*
             * 将当前窗口放到最上层
             */
            highestZIndex++;

            win.style.zIndex = highestZIndex;


            /*
             * 防止拖动时选中文本
             */
            event.preventDefault();

        });


        /* =================================================
           鼠标移动
           ================================================= */

        document.addEventListener("mousemove", (event) => {

            if (!isDragging) {
                return;
            }


            const deltaX =
                event.clientX - startMouseX;

            const deltaY =
                event.clientY - startMouseY;


            let newX =
                startWindowX + deltaX;

            let newY =
                startWindowY + deltaY;


            /*
             * 获取桌面尺寸
             */
            const desktop =
                document.getElementById("desktop");

            const desktopWidth =
                desktop.clientWidth;

            const desktopHeight =
                desktop.clientHeight;


            const windowWidth =
                win.offsetWidth;

            const windowHeight =
                win.offsetHeight;


            /*
             * 限制窗口不要完全拖出桌面
             *
             * 至少保留 40px 标题栏在桌面里面。
             */

            const minimumVisible = 40;


            /*
             * 左边界
             */
            newX =
                Math.max(
                    -(windowWidth - minimumVisible),
                    newX
                );


            /*
             * 上边界
             */
            newY =
                Math.max(
                    0,
                    newY
                );


            /*
             * 右边界
             */
            newX =
                Math.min(
                    desktopWidth - minimumVisible,
                    newX
                );


            /*
             * 下边界
             */
            newY =
                Math.min(
                    desktopHeight - minimumVisible,
                    newY
                );


            /*
             * 更新窗口位置
             */
            win.style.left = `${newX}px`;
            win.style.top = `${newY}px`;

        });


        /* =================================================
           鼠标松开
           ================================================= */

        document.addEventListener("mouseup", () => {

            isDragging = false;

        });


        /* =================================================
           点击窗口时置顶
           ================================================= */

        win.addEventListener("mousedown", () => {

            highestZIndex++;

            win.style.zIndex = highestZIndex;

        });

    });


})();
