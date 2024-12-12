export interface ToastOptions {
    title?: string;
    message: string;
    timeOut?: number;
    showCloseButton?: boolean;
    toastClass?: string;
    positionClass?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    style: "success" | "error" | "info" | "warning";
}

export class Toast implements ToastOptions {
    id: string = crypto.randomUUID();
    title?: string;
    message: string;
    timeOut: number;
    showCloseButton: boolean;
    toastClass?: string;
    positionClass: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    style: "success" | "error" | "info" | "warning";
    show = false; // New property to control visibility

    constructor(options: ToastOptions) {
        this.title = options.title;
        this.message = options.message;
        this.timeOut = options.timeOut ?? 3000;
        this.showCloseButton = options.showCloseButton ?? false;
        this.toastClass = options.toastClass;
        this.positionClass = options.positionClass ?? "top-right";
        this.style = options.style;
    }
}
