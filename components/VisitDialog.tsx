import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/Button";
import { storeHoursStructured } from "@/lib/site-config";
import { buildWaLink } from "@/lib/whatsapp";

type VisitDialogProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  product: { name: string };
  siteConfig: typeof import("@/lib/site-config").siteConfig;
};

export default function VisitDialog({
  isOpen,
  onRequestClose,
  product,
  siteConfig,
}: VisitDialogProps) {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({
    date: "",
    time: "",
  });
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const formatJakartaDate = (date: Date) => {
    return date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });
  };

  const [jakartaToday, setJakartaToday] = useState('');
  const [jakartaMaxDate, setJakartaMaxDate] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const today = formatJakartaDate(new Date());
    const maxDate = formatJakartaDate(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000));
    if (mountedRef.current) {
      setJakartaToday(today);
      setJakartaMaxDate(maxDate);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button, input, select")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onRequestClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button, input, select, [href]")];
      if (!focusable.length) return;
      const next = event.shiftKey ? focusable[0] : focusable[focusable.length - 1];
      if (document.activeElement === next) { event.preventDefault(); (event.shiftKey ? focusable[focusable.length - 1] : focusable[0]).focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", onKeyDown); previousFocus.current?.focus(); };
  }, [isOpen, onRequestClose]);

  // Generate time options based on selected date
  const generateTimeOptions = (dateStr: string) => {
    const selectedDate = new Date(`${dateStr}T12:00:00`);
    const day = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    let open: string, close: string;
    if (day === 0) {
      // Sunday
      open = storeHoursStructured.weekend.open;
      close = storeHoursStructured.weekend.close;
    } else {
      // Weekday
      open = storeHoursStructured.weekdays.open;
      close = storeHoursStructured.weekdays.close;
    }

    const startHour = parseInt(open.split(":")[0], 10);
    const endHour = parseInt(close.split(":")[0], 10);
    const options: string[] = [];
    for (let hour = startHour; hour < endHour; hour++) {
      const hourStr = hour.toString().padStart(2, "0");
      options.push(`${hourStr}:00`);
    }
    return options;
  };

  // Validate form
  const validate = () => {
    const newErrors: { date: string; time: string } = {
      date: "",
      time: "",
    };
    let valid = true;

    if (!form.date) {
      newErrors.date = "Please select a date";
      valid = false;
    } else {
      // Compare as strings in YYYY-MM-DD format
      if (form.date < jakartaToday) {
        newErrors.date = "Date cannot be in the past";
        valid = false;
      } else if (form.date > jakartaMaxDate) {
        newErrors.date = "Date must be within 60 days from today";
        valid = false;
      }
    }

    if (!form.time) {
      newErrors.time = "Please select a time";
      valid = false;
    } else {
      if (!form.date) {
        // Date is required for time validation
        newErrors.time = "Please select a date first";
        valid = false;
      } else {
        const selectedDate = new Date(`${form.date}T12:00:00`);
        const day = selectedDate.getDay();
        let open: string, close: string;
        if (day === 0) {
          open = storeHoursStructured.weekend.open;
          close = storeHoursStructured.weekend.close;
        } else {
          open = storeHoursStructured.weekdays.open;
          close = storeHoursStructured.weekdays.close;
        }
        const selectedTime = form.time;
        if (selectedTime < open || selectedTime >= close) {
          newErrors.time = `Time must be between ${open} and ${close}`;
          valid = false;
        }
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Build WhatsApp message
      const date = new Date(`${form.date}T12:00:00`);
      const formattedDate = date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const time = form.time;
      const name = form.name || "(tidak ada nama)";
      const message = `Halo VELVET, saya ingin booking kunjungan ke toko pada ${formattedDate} pukul ${time} untuk melihat ${product.name}. Nama: ${name}.`;
      const whatsAppLink = buildWaLink(message);
      window.open(whatsAppLink, "_blank", "noopener,noreferrer");
      // Note: In a real app, we would also show a confirmation and close the dialog.
      // For demo, we just open WhatsApp and keep the dialog open? We'll close after submitting.
      onRequestClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
      aria-labelledby="visit-dialog-title"
      aria-modal="true"
      role="dialog"
    >
      <div ref={dialogRef} className="relative bg-background rounded-lg p-6 md:p-8 w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 id="visit-dialog-title" className="text-xl font-semibold">Book a Visit</h2>
          <button
            onClick={onRequestClose}
            className="text-muted hover:text-ink p-2"
            aria-label="Close dialog"
          >
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Store Information</h3>
            <p className="text-sm">
              {siteConfig.name} - {siteConfig.address.line1}, {siteConfig.address.line2}
            </p>
            <p className="text-sm">{siteConfig.storeHours}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="visit-name" className="block text-sm font-medium mb-2">
                Name (optional)
              </label>
              <input 
                type="text"
                id="visit-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-line rounded-md focus-visible:outline-2 focus-visible:outline-ink"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="visit-date" className="block text-sm font-medium mb-2">
                Date
              </label>
              <input 
                type="date"
                id="visit-date"
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "visit-date-error" : undefined}
                value={form.date}
                onChange={(e) => {
                  const date = e.target.value;
                  setForm(prev => ({ ...prev, date, time: "" }));
                  // Update time options when date changes
                  setTimeOptions(generateTimeOptions(date));
                  // Reset time selection
                  setErrors(prev => ({ ...prev, date: "" }));
                }}
                className="w-full px-3 py-2 border border-line rounded-md focus-visible:outline-2 focus-visible:outline-ink"
                min={jakartaToday}
                max={jakartaMaxDate}
              />
              {errors.date && (
                <p id="visit-date-error" role="alert" className="text-sm text-red-700 mt-1">{errors.date}</p>
              )}
            </div>
            <div>
              <label htmlFor="visit-time" className="block text-sm font-medium mb-2">
                Time
              </label>
              <select
                id="visit-time"
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? "visit-time-error" : undefined}
                value={form.time}
                onChange={(e) => {
                  setForm(prev => ({ ...prev, time: e.target.value }));
                  setErrors(prev => ({ ...prev, time: "" }));
                }}
                className="w-full px-3 py-2 border border-line rounded-md focus-visible:outline-2 focus-visible:outline-ink"
                disabled={timeOptions.length === 0}
              >
                <option value="">Select a time</option>
                {timeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p id="visit-time-error" role="alert" className="text-sm text-red-700 mt-1">{errors.time}</p>
              )}
            </div>
            <div className="text-xs text-muted">
              <p>Note: This is a demo only. No actual booking will be made.</p>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}