class SortingVisualizer {
    constructor() {
        this.array = [];
        this.arraySize = 30;
        this.speed = 5;
        this.isSorting = false;
        this.comparisons = 0;
        this.swaps = 0;
        this.startTime = 0;
        
        this.initializeElements();
        this.bindEvents();
        this.generateArray();
        this.updateAlgorithmInfo();
        this.installCursorGlow();
    }

    initializeElements() {
        this.arrayContainer = document.getElementById('array-container');
        this.sizeSlider = document.getElementById('array-size');
        this.sizeValue = document.getElementById('size-value');
        this.speedSlider = document.getElementById('speed');
        this.speedValue = document.getElementById('speed-value');
        this.generateBtn = document.getElementById('generate-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.startBtn = document.getElementById('start-btn');
        this.themeToggle = document.getElementById('theme-toggle');
        this.algoBtns = document.querySelectorAll('.algo-btn');
        this.comparisonsEl = document.getElementById('comparisons');
        this.swapsEl = document.getElementById('swaps');
        this.timeEl = document.getElementById('time');
        this.algorithmInfo = document.getElementById('algorithm-info');
        this.progressBar = document.getElementById('progress-bar');
    }

    bindEvents() {
        this.sizeSlider.addEventListener('input', (e) => {
            this.arraySize = parseInt(e.target.value);
            this.sizeValue.textContent = this.arraySize;
            if (!this.isSorting) {
                this.generateArray();
            }
        });

        this.speedSlider.addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            this.speedValue.textContent = this.speed;
        });

        this.generateBtn.addEventListener('click', () => {
            if (!this.isSorting) {
                this.generateArray();
            }
        });

        this.resetBtn.addEventListener('click', () => {
            if (!this.isSorting) {
                this.resetArray();
            }
        });

        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => {
                if (!this.isSorting) {
                    this.startSorting();
                }
            });
        }

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                const isLight = document.body.classList.toggle('light');
                this.themeToggle.textContent = isLight ? 'Toggle Theme: Dark' : 'Toggle Theme: Light';
                localStorage.setItem('sv-theme', isLight ? 'light' : 'dark');
            });
            // Init from storage
            const saved = localStorage.getItem('sv-theme');
            if (saved === 'light') {
                document.body.classList.add('light');
                this.themeToggle.textContent = 'Toggle Theme: Dark';
            } else {
                this.themeToggle.textContent = 'Toggle Theme: Light';
            }
        }

        this.algoBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.isSorting) {
                    this.selectAlgorithm(e.target);
                    this.updateAlgorithmInfo();
                }
            });
        });

        // Keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 's') {
                if (!this.isSorting) this.startSorting();
            }
            if (e.key.toLowerCase() === 'g') {
                if (!this.isSorting) this.generateArray();
            }
            if (e.key.toLowerCase() === 'r') {
                if (!this.isSorting) this.resetArray();
            }
            if (e.key >= '1' && e.key <= '6') {
                const index = parseInt(e.key, 10) - 1;
                const btn = this.algoBtns[index];
                if (btn && !this.isSorting) {
                    this.selectAlgorithm(btn);
                    this.updateAlgorithmInfo();
                }
            }
        });
    }

    generateArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * 300) + 10);
        }
        this.renderArray();
        this.resetStats();
        this.originalArray = [...this.array];
    }

    resetArray() {
        this.array = [...this.originalArray];
        this.renderArray();
        this.resetStats();
    }

    renderArray() {
        this.arrayContainer.innerHTML = '';
        const maxValue = Math.max(...this.array);
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'array-bar';
            bar.style.height = `${(value / maxValue) * 100}%`;
            bar.style.width = `${Math.max(8, 100 / this.arraySize)}px`;
            bar.setAttribute('data-index', index);
            bar.setAttribute('data-value', value);
            this.arrayContainer.appendChild(bar);
        });
    }

    resetStats() {
        this.comparisons = 0;
        this.swaps = 0;
        this.updateStats();
    }

    updateStats() {
        this.comparisonsEl.textContent = this.comparisons;
        this.swapsEl.textContent = this.swaps;
    }

    selectAlgorithm(btn) {
        this.algoBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedAlgorithm = btn.dataset.algorithm;
    }

    updateAlgorithmInfo() {
        const algorithmInfo = {
            bubble: {
                name: 'Bubble Sort',
                description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
                complexity: 'O(n²)',
                characteristics: [
                    'Simple to understand and implement',
                    'Stable sorting algorithm',
                    'In-place sorting',
                    'Good for small datasets or nearly sorted data'
                ]
            },
            selection: {
                name: 'Selection Sort',
                description: 'An in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist.',
                complexity: 'O(n²)',
                characteristics: [
                    'Simple to implement',
                    'In-place sorting',
                    'Not stable',
                    'Minimal memory usage'
                ]
            },
            insertion: {
                name: 'Insertion Sort',
                description: 'A simple sorting algorithm that builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.',
                complexity: 'O(n²)',
                characteristics: [
                    'Simple implementation',
                    'Stable sorting algorithm',
                    'In-place sorting',
                    'Efficient for small data sets'
                ]
            },
            merge: {
                name: 'Merge Sort',
                description: 'A divide-and-conquer algorithm that recursively breaks down a problem into two or more sub-problems until they become simple enough to solve directly.',
                complexity: 'O(n log n)',
                characteristics: [
                    'Stable sorting algorithm',
                    'Predictable performance',
                    'Not in-place (requires extra memory)',
                    'Excellent for large datasets'
                ]
            },
            quick: {
                name: 'Quick Sort',
                description: 'A highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy to sort elements.',
                complexity: 'O(n log n) average, O(n²) worst case',
                characteristics: [
                    'Very efficient on average',
                    'In-place sorting',
                    'Not stable',
                    'Good cache performance'
                ]
            },
            heap: {
                name: 'Heap Sort',
                description: 'A comparison-based sorting algorithm that uses a binary heap data structure to sort elements.',
                complexity: 'O(n log n)',
                characteristics: [
                    'In-place sorting',
                    'Not stable',
                    'Consistent performance',
                    'Good for large datasets'
                ]
            }
        };

        const selected = algorithmInfo[this.selectedAlgorithm] || algorithmInfo.bubble;
        
        this.algorithmInfo.innerHTML = `
            <h4>${selected.name}</h4>
            <p>${selected.description}</p>
            <div class="algorithm-details">
                <h4>Time Complexity: ${selected.complexity}</h4>
                <h4>Characteristics:</h4>
                <ul>
                    ${selected.characteristics.map(char => `<li>${char}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    async startSorting() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.startTime = Date.now();
        this.resetStats();
        this.disableControls();
        
        const delay = (11 - this.speed) * 40; // Convert speed to delay, slightly faster
        
        switch (this.selectedAlgorithm) {
            case 'bubble':
                await this.bubbleSort(delay);
                break;
            case 'selection':
                await this.selectionSort(delay);
                break;
            case 'insertion':
                await this.insertionSort(delay);
                break;
            case 'merge':
                await this.mergeSort(delay);
                break;
            case 'quick':
                await this.quickSort(delay);
                break;
            case 'heap':
                await this.heapSort(delay);
                break;
        }
        
        this.finishSorting();
    }

    async bubbleSort(delay) {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            this.updateProgress(i / (n - 1));
            for (let j = 0; j < n - i - 1; j++) {
                this.comparisons++;
                this.updateStats();
                
                this.highlightBars(j, j + 1, 'comparing');
                await this.sleep(delay);
                
                if (this.array[j] > this.array[j + 1]) {
                    this.swaps++;
                    this.updateStats();
                    
                    this.highlightBars(j, j + 1, 'swapping');
                    await this.sleep(delay);
                    
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.renderArray();
                }
                
                this.removeHighlight(j, j + 1);
            }
            this.markAsSorted(n - i - 1);
        }
        this.markAsSorted(0);
    }

    async selectionSort(delay) {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            this.updateProgress(i / (n - 1));
            let minIndex = i;
            
            for (let j = i + 1; j < n; j++) {
                this.comparisons++;
                this.updateStats();
                
                this.highlightBars(minIndex, j, 'comparing');
                await this.sleep(delay);
                
                if (this.array[j] < this.array[minIndex]) {
                    minIndex = j;
                }
                
                this.removeHighlight(minIndex, j);
            }
            
            if (minIndex !== i) {
                this.swaps++;
                this.updateStats();
                
                this.highlightBars(i, minIndex, 'swapping');
                await this.sleep(delay);
                
                [this.array[i], this.array[minIndex]] = [this.array[minIndex], this.array[i]];
                this.renderArray();
                this.removeHighlight(i, minIndex);
            }
            
            this.markAsSorted(i);
        }
        this.markAsSorted(n - 1);
    }

    async insertionSort(delay) {
        const n = this.array.length;
        for (let i = 1; i < n; i++) {
            this.updateProgress(i / (n - 1));
            let key = this.array[i];
            let j = i - 1;
            
            this.highlightBars(i, j, 'comparing');
            await this.sleep(delay);
            
            while (j >= 0 && this.array[j] > key) {
                this.comparisons++;
                this.updateStats();
                
                this.highlightBars(j, j + 1, 'swapping');
                await this.sleep(delay);
                
                this.array[j + 1] = this.array[j];
                this.swaps++;
                this.updateStats();
                this.renderArray();
                
                j--;
            }
            
            this.array[j + 1] = key;
            this.renderArray();
            this.removeHighlight(i, j + 1);
            this.markAsSorted(i);
        }
    }

    async mergeSort(delay) {
        await this.mergeSortHelper(0, this.array.length - 1, delay);
        this.updateProgress(1);
    }

    async mergeSortHelper(left, right, delay) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            await this.mergeSortHelper(left, mid, delay);
            await this.mergeSortHelper(mid + 1, right, delay);
            await this.merge(left, mid, right, delay);
        }
    }

    async merge(left, mid, right, delay) {
        const leftArray = this.array.slice(left, mid + 1);
        const rightArray = this.array.slice(mid + 1, right + 1);
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArray.length && j < rightArray.length) {
            this.comparisons++;
            this.updateStats();
            
            this.highlightBars(k, k, 'comparing');
            await this.sleep(delay);
            
            if (leftArray[i] <= rightArray[j]) {
                this.array[k] = leftArray[i];
                i++;
            } else {
                this.array[k] = rightArray[j];
                j++;
                this.swaps++;
                this.updateStats();
            }
            
            this.renderArray();
            this.removeHighlight(k, k);
            k++;
        }
        
        while (i < leftArray.length) {
            this.array[k] = leftArray[i];
            this.renderArray();
            i++;
            k++;
        }
        
        while (j < rightArray.length) {
            this.array[k] = rightArray[j];
            this.renderArray();
            j++;
            k++;
        }
    }

    async quickSort(delay) {
        await this.quickSortHelper(0, this.array.length - 1, delay);
        this.updateProgress(1);
    }

    async quickSortHelper(low, high, delay) {
        if (low < high) {
            const pi = await this.partition(low, high, delay);
            await this.quickSortHelper(low, pi - 1, delay);
            await this.quickSortHelper(pi + 1, high, delay);
        }
    }

    async partition(low, high, delay) {
        const pivot = this.array[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            this.comparisons++;
            this.updateStats();
            
            this.highlightBars(j, high, 'comparing');
            await this.sleep(delay);
            
            if (this.array[j] < pivot) {
                i++;
                
                if (i !== j) {
                    this.swaps++;
                    this.updateStats();
                    
                    this.highlightBars(i, j, 'swapping');
                    await this.sleep(delay);
                    
                    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                    this.renderArray();
                    this.removeHighlight(i, j);
                }
            }
            
            this.removeHighlight(j, high);
        }
        
        if (i + 1 !== high) {
            this.swaps++;
            this.updateStats();
            
            this.highlightBars(i + 1, high, 'swapping');
            await this.sleep(delay);
            
            [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
            this.renderArray();
            this.removeHighlight(i + 1, high);
        }
        
        return i + 1;
    }

    async heapSort(delay) {
        const n = this.array.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(n, i, delay);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            this.updateProgress((n - i) / (n - 1));
            this.swaps++;
            this.updateStats();
            
            this.highlightBars(0, i, 'swapping');
            await this.sleep(delay);
            
            [this.array[0], this.array[i]] = [this.array[i], this.array[0]];
            this.renderArray();
            this.removeHighlight(0, i);
            
            this.markAsSorted(i);
            await this.heapify(i, 0, delay);
        }
        
        this.markAsSorted(0);
    }

    async heapify(n, i, delay) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n) {
            this.comparisons++;
            this.updateStats();
            
            this.highlightBars(largest, left, 'comparing');
            await this.sleep(delay);
            
            if (this.array[left] > this.array[largest]) {
                largest = left;
            }
            
            this.removeHighlight(largest, left);
        }
        
        if (right < n) {
            this.comparisons++;
            this.updateStats();
            
            this.highlightBars(largest, right, 'comparing');
            await this.sleep(delay);
            
            if (this.array[right] > this.array[largest]) {
                largest = right;
            }
            
            this.removeHighlight(largest, right);
        }
        
        if (largest !== i) {
            this.swaps++;
            this.updateStats();
            
            this.highlightBars(i, largest, 'swapping');
            await this.sleep(delay);
            
            [this.array[i], this.array[largest]] = [this.array[largest], this.array[i]];
            this.renderArray();
            this.removeHighlight(i, largest);
            
            await this.heapify(n, largest, delay);
        }
    }

    highlightBars(index1, index2, className) {
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        if (bars[index1]) bars[index1].classList.add(className);
        if (bars[index2]) bars[index2].classList.add(className);
    }

    removeHighlight(index1, index2) {
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        if (bars[index1]) bars[index1].classList.remove('comparing', 'swapping');
        if (bars[index2]) bars[index2].classList.remove('comparing', 'swapping');
    }

    markAsSorted(index) {
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        if (bars[index]) bars[index].classList.add('sorted');
    }

    disableControls() {
        this.algoBtns.forEach(btn => btn.disabled = true);
        this.generateBtn.disabled = true;
        this.resetBtn.disabled = true;
        this.sizeSlider.disabled = true;
        this.speedSlider.disabled = true;
    }

    enableControls() {
        this.algoBtns.forEach(btn => btn.disabled = false);
        this.generateBtn.disabled = false;
        this.resetBtn.disabled = false;
        this.sizeSlider.disabled = false;
        this.speedSlider.disabled = false;
    }

    finishSorting() {
        this.isSorting = false;
        this.enableControls();
        
        const endTime = Date.now();
        const totalTime = endTime - this.startTime;
        this.timeEl.textContent = `${totalTime}ms`;
        
        // Mark all bars as sorted
        const bars = this.arrayContainer.querySelectorAll('.array-bar');
        bars.forEach(bar => bar.classList.add('sorted'));

        this.celebrate();
        this.updateProgress(0);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateProgress(ratio) {
        if (!this.progressBar) return;
        const clamped = Math.max(0, Math.min(1, ratio || 0));
        this.progressBar.style.width = `${Math.floor(clamped * 100)}%`;
    }

    installCursorGlow() {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);
        window.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    }

    celebrate() {
        // Simple confetti-like effect using floating spans
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.inset = '0';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.overflow = 'hidden';
        confettiContainer.style.zIndex = '9999';

        const colors = ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24', '#fb7185'];
        const total = 80;

        for (let i = 0; i < total; i++) {
            const piece = document.createElement('span');
            piece.style.position = 'absolute';
            piece.style.top = '-20px';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.width = Math.random() * 8 + 4 + 'px';
            piece.style.height = Math.random() * 14 + 6 + 'px';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.filter = 'drop-shadow(0 8px 12px rgba(0,0,0,0.35))';
            piece.style.transform = `rotate(${Math.random()*360}deg)`;
            piece.style.borderRadius = '2px';
            piece.style.opacity = '0.9';

            const fall = 800 + Math.random() * 1200;
            const delay = Math.random() * 300;
            piece.animate([
                { transform: `translateY(-20px) rotate(0deg)` },
                { transform: `translate(${(Math.random()*2-1)*100}px, ${window.innerHeight+40}px) rotate(${Math.random()*720-360}deg)` }
            ], { duration: fall, delay, easing: 'cubic-bezier(.15,.65,.45,1)', fill: 'forwards' });

            confettiContainer.appendChild(piece);
        }
        document.body.appendChild(confettiContainer);
        setTimeout(() => confettiContainer.remove(), 2200);
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const visualizer = new SortingVisualizer();
    
    // Add click handlers for algorithm buttons
    document.querySelectorAll('.algo-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!visualizer.isSorting) {
                visualizer.startSorting();
            }
        });
    });
});
