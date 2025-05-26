class WeightedQuickUnion {
    constructor(numberOfNodes) {
        this.prnt = new Array(numberOfNodes);
        this.size = new Array(numberOfNodes);
        
        for (let i = 0; i < numberOfNodes; i++) {
            this.prnt[i] = i;
            this.size[i] = 1;
        }
    }

    connect(p, q) {
        const rp = this.root(p);
        const rq = this.root(q);
        
        if (this.size[rp] > this.size[rq]) {
            this.prnt[rq] = rp;
            this.size[rp] += this.size[rq];
        } else {
            this.prnt[rp] = rq;
            this.size[rq] += this.size[rp];
        }
    }

    isConnected(p, q) {
        return this.root(p) === this.root(q);
    }

    root(p) {
        while (p !== this.prnt[p]) {
            this.prnt[p] = this.prnt[this.prnt[p]]; // This flattens the tree even further
            p = this.prnt[p];
        }
        return p;
    }
}

export default WeightedQuickUnion;
