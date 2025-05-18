
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate unique IDs
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}

// Check if required fields are present
export function checkRequiredFields(data: any, requiredFields: string[]) {
  return requiredFields.every(field => {
    if (!data[field] && data[field] !== 0) return false;
    if (typeof data[field] === 'string' && data[field].trim() === '') return false;
    return true;
  });
}

// Save data to localStorage (simulating backend)
export async function saveData(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    // Simulate API call
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
}

// Load data from localStorage (simulating backend)
export async function loadData(key: string) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

// Format date to readable string
export function formatDate(date: Date | string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
