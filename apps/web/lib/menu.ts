export type MenuItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
};

export type MenuCategory = {
    category: string;
    items: MenuItem[];
};

export async function getMenu(): Promise<MenuCategory[]> {
    const res = await fetch(
        "http://localhost:3002/restaurants/1/menu",
        { cache: "no-store", }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch menu");
    }

    return res.json();
}