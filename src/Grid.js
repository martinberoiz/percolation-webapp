import WeightedQuickUnion from './WeightedQuickUnion.js';

class Grid {
    constructor() {
        this.grid = null;
        this.nopenings = 0;
        this.vp_top = 0;
        this.vp_bottom = 0;
        this.gridSide = 0;
        this.gridSize = 0;
        this.wqu = null;
    }

    setGridSide(newGridSide) {
        if (newGridSide === this.gridSide) return;
        
        this.gridSide = newGridSide;
        this.gridSize = this.gridSide * this.gridSide;
        
        // Create new WeightedQuickUnion instance
        this.wqu = new WeightedQuickUnion(this.gridSize + 2);
        
        // Create 2D array for grid
        this.grid = Array(this.gridSide).fill().map(() => 
            Array(this.gridSide).fill(0)
        );
        
        // Set up virtual points
        this.vp_top = this.gridSize;
        this.vp_bottom = this.gridSize + 1;
        
        // Connect top and bottom virtual points
        for (let i = 0; i < this.gridSide; i++) {
            this.wqu.connect(this.vp_top, i);
        }
        for (let i = this.gridSide * (this.gridSide - 1); i < this.gridSize; i++) {
            this.wqu.connect(this.vp_bottom, i);
        }
    }

    openSite(row, col) {
        if (this.grid[row][col] === 1) return;
        
        this.grid[row][col] = 1;
        const site = row * this.gridSide + col;
        
        // Check and connect with all four neighbors
        if (row !== 0 && this.grid[row - 1][col] === 1) {
            this.wqu.connect(site, site - this.gridSide);
        }
        if (row !== this.gridSide - 1 && this.grid[row + 1][col] === 1) {
            this.wqu.connect(site, site + this.gridSide);
        }
        if (col !== 0 && this.grid[row][col - 1] === 1) {
            this.wqu.connect(site, site - 1);
        }
        if (col !== this.gridSide - 1 && this.grid[row][col + 1] === 1) {
            this.wqu.connect(site, site + 1);
        }
        
        this.nopenings++;
    }

    didPercolate() {
        return this.wqu.isConnected(this.vp_top, this.vp_bottom);
    }

    isConnectedWithTop(row, col) {
        const site = row * this.gridSide + col;
        if (site < this.gridSize && site >= 0) {
            return this.wqu.isConnected(site, this.vp_top);
        }
        return false;
    }

    getGrid() {
        return this.grid;
    }
}

export default Grid; 