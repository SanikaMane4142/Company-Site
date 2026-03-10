import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("message", form.message);

    if (resume) data.append("resume", resume);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Application submitted!");
        onClose();
      } else {
        alert(result.error || "Server error");
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed z-50 inset-0 flex items-center justify-center p-4 sm:p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="bg-[#111] text-white p-6 sm:p-8 rounded-xl w-full max-w-lg shadow-xl border border-gray-800">

              <h2 className="text-xl sm:text-2xl font-semibold mb-6">
                Apply for this role
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full p-3 rounded bg-black border border-gray-700"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 rounded bg-black border border-gray-700"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <textarea
                  placeholder="Message (optional)"
                  className="w-full p-3 rounded bg-black border border-gray-700"
                  rows={3}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  className="w-full"
                  onChange={(e) =>
                    setResume(e.target.files?.[0] || null)
                  }
                />

                <button
                  type="submit"
                  className="w-full bg-white text-black py-3 rounded font-semibold hover:opacity-90"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ApplicationModal;