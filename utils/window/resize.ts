

export function Resize(e: React.MouseEvent<HTMLDivElement>) {
        const target = document.getElementById('window')
        if (!target) return

            const rect = target.getBoundingClientRect()
            const startX = e.clientX
            const startY = e.clientY
            const startWidth = rect.width
            const startHeight = rect.height
            const startLeft = rect.left
            const startTop = rect.top
            const cursor = getComputedStyle(target).cursor

            let frameRequested = false

            document.body.style.cursor = cursor
            document.body.style.userSelect = 'none'


            function onMouseMove(ev: MouseEvent) {
                if (frameRequested) return
                    frameRequested = true

                requestAnimationFrame(() => {
                    frameRequested = false
                    const dx = ev.clientX - startX
                    const dy = ev.clientY - startY
                    const win = document.getElementById('window')

                    if (isFullScreen(win)) {
                        const element = document.getElementById('window')

                        if (!element) return
                        element.classList.remove('maximized')
                    }
                    // handle horizontal & vertical at once for corners
                    switch (cursor) {
                        case 'e-resize':
                            if (!target) return
                        if (startWidth + dx > 100) target.style.width = `${startWidth + dx}px`
                        break
                        case 'w-resize':

                            if (startWidth - dx > 100) {

                            if (!target) return
                                target.style.width = `${startWidth - dx}px`
                            target.style.left = `${startLeft + dx}px`
                            target.style.position = 'absolute'
                        }
                        break
                        case 's-resize':
                            if (!target) return
                        if (startHeight + dy > 100) target.style.height = `${startHeight + dy}px`
                        break
                        case 'n-resize':
                            if (startHeight - dy > 100) {
                            if (!target) return
                                target.style.height = `${startHeight - dy}px`
                            target.style.top = `${startTop + dy}px`
                            target.style.position = 'absolute'
                        }
                        break
                        case 'se-resize':
                            if (!target) return
                        if (startWidth + dx > 100) target.style.width = `${startWidth + dx}px`
                        if (startHeight + dy > 100) target.style.height = `${startHeight + dy}px`
                        break
                        case 'sw-resize':
                            if (startWidth - dx > 100) {
                            if (!target) return
                                target.style.width = `${startWidth - dx}px`
                            target.style.left = `${startLeft + dx}px`
                            target.style.position = 'absolute'
                        }
                        if (startHeight + dy > 100)
                            if (target){ 
                                target.style.height = `${startHeight + dy}px`
                            }
                            break
                            case 'ne-resize':
                                if (startWidth + dx > 100)
                            if (target){ 
                                target.style.width = `${startWidth + dx}px`
                            }
                            if (startHeight - dy > 100) {
                                if (!target) return
                                    target.style.height = `${startHeight - dy}px`
                                target.style.top = `${startTop + dy}px`
                                target.style.position = 'absolute'
                            }
                            break
                            case 'nw-resize':
                                if (startWidth - dx > 100) {
                                if (!target) return
                                    target.style.width = `${startWidth - dx}px`
                                target.style.left = `${startLeft + dx}px`
                                target.style.position = 'absolute'
                            }
                            if (startHeight - dy > 100) {
                                if (!target) return
                                    target.style.height = `${startHeight - dy}px`
                                target.style.top = `${startTop + dy}px`
                                target.style.position = 'absolute'
                            }
                            break
                    }
                })
            }

            function onMouseUp() {
                document.body.style.cursor = 'default'
                document.body.style.userSelect = ''
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
    }


function isFullScreen(element : HTMLElement) {
    const rect = element.getBoundingClientRect()
    return (
        Math.round(rect.top) <= 0 &&
            Math.round(rect.left) <= 0 &&
            Math.round(rect.width) >= window.innerWidth &&
            Math.round(rect.height) >= window.innerHeight
    )
}
