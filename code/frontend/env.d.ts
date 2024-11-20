/// <reference types="vite/client" />

declare module 'jspdf' {
  interface jsPDF {
    autoTable: any // Add type definition for autoTable if needed
  }
}
