# Sorting Visualizer

A beautiful, interactive web application that visualizes various sorting algorithms in real-time. Watch as different sorting algorithms work their magic on randomly generated arrays with smooth animations and detailed statistics.

## 🚀 Features

### **Sorting Algorithms**
- **Bubble Sort** - Simple O(n²) algorithm with adjacent element comparisons
- **Selection Sort** - In-place O(n²) algorithm that finds minimum elements
- **Insertion Sort** - Efficient O(n²) algorithm for small datasets
- **Merge Sort** - Divide-and-conquer O(n log n) algorithm
- **Quick Sort** - Highly efficient O(n log n) average case algorithm
- **Heap Sort** - O(n log n) algorithm using binary heap data structure

### **Interactive Controls**
- **Array Size Slider** - Adjust from 5 to 100 elements
- **Speed Control** - Control animation speed from 1 (slow) to 10 (fast)
- **Generate New Array** - Create fresh random arrays
- **Reset** - Return to the original unsorted state

### **Visual Features**
- **Real-time Visualization** - Watch algorithms work step-by-step
- **Color-coded States** - Different colors for comparing, swapping, and sorted elements
- **Smooth Animations** - Fluid transitions and scaling effects
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### **Statistics & Information**
- **Live Counters** - Track comparisons and swaps in real-time
- **Execution Time** - Measure algorithm performance
- **Algorithm Details** - Learn about each sorting method
- **Complexity Information** - Understand time and space complexity

## 🎯 How to Use

1. **Open the Application**
   - Simply open `index.html` in any modern web browser
   - No installation or setup required!

2. **Choose Your Settings**
   - Use the sliders to adjust array size and animation speed
   - Click "Generate New Array" to create a fresh dataset

3. **Select an Algorithm**
   - Click on any sorting algorithm button
   - Watch the visualization begin automatically
   - Observe the color changes and animations

4. **Monitor Progress**
   - Track comparisons and swaps in real-time
   - See execution time when sorting completes
   - Learn about each algorithm's characteristics

## 🛠️ Technical Details

### **Built With**
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Object-oriented programming with async/await
- **CSS Grid & Flexbox** - Responsive layouts that work on all devices

### **Architecture**
- **Class-based Design** - Clean, maintainable code structure
- **Event-driven UI** - Responsive user interactions
- **Async Sorting** - Non-blocking algorithm execution
- **Modular Functions** - Easy to extend with new algorithms

### **Performance Features**
- **Efficient Rendering** - Optimized DOM manipulation
- **Smooth Animations** - CSS transitions for fluid movement
- **Memory Management** - Proper cleanup and resource handling
- **Responsive Controls** - Real-time updates without lag

## 🌟 Key Features Explained

### **Visual States**
- **Default** - Blue gradient bars representing array values
- **Comparing** - Yellow bars when elements are being compared
- **Swapping** - Red bars during element exchanges
- **Sorted** - Green bars for completed sections

### **Animation System**
- **Configurable Speed** - Adjust from 50ms to 500ms delays
- **Smooth Transitions** - CSS transitions for all visual changes
- **Real-time Updates** - Immediate feedback during sorting
- **Progress Indicators** - Visual cues for algorithm progress

### **Responsive Design**
- **Mobile-First** - Optimized for touch devices
- **Adaptive Layouts** - Grid systems that adjust to screen size
- **Touch-Friendly** - Large buttons and intuitive controls
- **Cross-Platform** - Works on all modern browsers

## 🔧 Customization

### **Adding New Algorithms**
1. Implement the sorting logic in the `SortingVisualizer` class
2. Add the algorithm button to the HTML
3. Update the `startSorting()` method
4. Add algorithm information to `updateAlgorithmInfo()`

### **Modifying Visual Styles**
- Edit `styles.css` to change colors, animations, and layouts
- Adjust timing values in the JavaScript for different animation speeds
- Modify the color scheme by updating CSS custom properties

### **Extending Functionality**
- Add new statistics (e.g., memory usage, recursion depth)
- Implement additional array generation methods
- Create comparison modes between algorithms
- Add sound effects or haptic feedback

## 📱 Browser Compatibility

- **Chrome** 60+ ✅
- **Firefox** 55+ ✅
- **Safari** 12+ ✅
- **Edge** 79+ ✅
- **Mobile Browsers** ✅

## 🎓 Educational Value

This visualizer is perfect for:
- **Computer Science Students** - Understanding algorithm concepts
- **Programming Beginners** - Learning sorting fundamentals
- **Algorithm Analysis** - Comparing performance characteristics
- **Teaching & Presentations** - Visual demonstrations in classrooms

## 🚀 Getting Started

1. **Download the Files**
   ```
   index.html
   styles.css
   script.js
   README.md
   ```

2. **Open in Browser**
   - Double-click `index.html` or drag it into your browser
   - Or use a local server for development

3. **Start Exploring**
   - Try different array sizes
   - Experiment with various speeds
   - Compare algorithm performances
   - Learn about sorting complexity

## 🤝 Contributing

Feel free to contribute improvements:
- Add new sorting algorithms
- Enhance the visual design
- Optimize performance
- Add new features
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Sorting! 🎉**

Watch algorithms come to life and gain a deeper understanding of how sorting works through interactive visualization.
