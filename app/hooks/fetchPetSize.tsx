type SizeCategory = {
    size: 'Small' | 'Medium' | 'Big' | 'Extra-Big';
    start: number;
    end: number;
};

const sizes: SizeCategory[] = [
    { size: 'Small', start: 0, end: 9 },
    { size: 'Medium', start: 10, end: 15 },
    { size: 'Big', start: 16, end: 25 },
    { size: 'Extra-Big', start: 25, end: Infinity },
];

export const getSizeCategory = (value: number | undefined): SizeCategory | null => {
    if(!value) return null;

    const found = sizes.find(s => value >= s.start && value <= s.end);
    return found ?? null;
};
