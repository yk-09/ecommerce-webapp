interface Identifiable {
    id: string;
}
export default function getItem<T extends Identifiable>(items: T[], id: string): T | undefined;
export {};
//# sourceMappingURL=matching-item.d.ts.map