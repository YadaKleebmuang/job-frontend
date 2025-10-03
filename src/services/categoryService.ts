// src/services/categoryService.ts
import axios from "axios";
import type { Category } from "../types/category"; // 👈 นำเข้า Interface ใหม่

// ✅ ใช้ environment variable ของ Vite
const API_URL = `${import.meta.env.VITE_API_URL}/category`;
if (!API_URL) throw new Error("Missing VITE_API_URL");

// -------------------------------------------------------------------
// 1. READ: ดึงรายการหมวดหมู่ทั้งหมด (GET /api/category)
// -------------------------------------------------------------------
export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data as Category[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to load categories from the server.");
    }
};

// -------------------------------------------------------------------
// 2. READ: ดึงหมวดหมู่ตาม ID (GET /api/category/{id})
// -------------------------------------------------------------------
export const getCategoryById = async (id: number): Promise<Category> => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data as Category;
    } catch (error) {
        console.error(`Error fetching category with ID ${id}:`, error);
        throw new Error(`Failed to load category with ID ${id}.`);
    }
};

// -------------------------------------------------------------------
// 3. CREATE: เพิ่มหมวดหมู่ใหม่ (POST /api/category)
// -------------------------------------------------------------------
// 💡 ใช้ Omit เพื่อไม่ส่ง categoryId ไปตอนสร้าง
type CreateCategoryDto = Omit<Category, "categoryId">;

export const createCategory = async (categoryData: CreateCategoryDto): Promise<Category> => {
    try {
        const response = await axios.post(API_URL, categoryData);
        return response.data as Category;
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Failed to create new category.");
    }
};

// -------------------------------------------------------------------
// 4. UPDATE: อัปเดตหมวดหมู่ (PUT /api/category/{id})
// -------------------------------------------------------------------
export const updateCategory = async (id: number, categoryData: Category): Promise<void> => {
    try {
        await axios.put(`${API_URL}/${id}`, categoryData);
    } catch (error) {
        console.error(`Error updating category with ID ${id}:`, error);
        throw new Error(`Failed to update category with ID ${id}.`);
    }
};

// -------------------------------------------------------------------
// 5. DELETE: ลบหมวดหมู่ (DELETE /api/category/{id})
// -------------------------------------------------------------------
export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting category with ID ${id}:`, error);
        throw new Error(`Failed to delete category with ID ${id}.`);
    }
};