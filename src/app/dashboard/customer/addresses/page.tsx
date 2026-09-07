"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  X,
  Phone,
  Star,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  type Address,
  type AddressFormData,
} from "@/lib/api/address";

  //  ADDRESSES PAGE
  //  Customer can add / update / delete their own addresses.

const emptyForm: AddressFormData = {
  label: "",
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  postalCode: "",
  country: "",
  isDefault: false,
};

const AddressesPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [form, setForm] = useState<AddressFormData>(emptyForm);
  const [saving, setSaving] = useState(false);

    //  LOAD ADDRESSES
  const loadAddresses = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getAddresses(userId);
      setAddresses(data);
    } catch (err) {
      console.error("ADDRESS FETCH ERROR:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to load addresses"
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);


  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (addr: Address) => {
    setEditing(addr);
    setForm({
      label: addr.label ?? "",
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine: addr.addressLine,
      city: addr.city,
      postalCode: addr.postalCode ?? "",
      country: addr.country,
      isDefault: addr.isDefault,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please log in first");
      return;
    }

    // Required fields (match the backend).
    const required: (keyof AddressFormData)[] = [
      "fullName",
      "phone",
      "addressLine",
      "city",
      "country",
    ];
    const hasEmpty = required.some(
      (field) => String(form[field] ?? "").trim() === ""
    );
    if (hasEmpty) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);
      if (editing) {
        await updateAddress(userId, editing.id, form);
        toast.success("Address updated");
      } else {
        await createAddress(userId, form);
        toast.success("Address added");
      }
      await loadAddresses();
      closeModal();
    } catch (err) {
      console.error("ADDRESS SAVE ERROR:", err);
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------------------------------------------------
     DELETE (optimistic)
  --------------------------------------------------------- */
  const handleDelete = async (id: string) => {
    if (!userId) return;
    if (!window.confirm("Delete this address?")) return;

    const previous = addresses;
    setAddresses((prev) => prev.filter((a) => a.id !== id));

    try {
      await deleteAddress(userId, id);
      toast.success("Address deleted");
    } catch (err) {
      console.error("ADDRESS DELETE ERROR:", err);
      toast.error(err instanceof Error ? err.message : "Failed to delete");
      setAddresses(previous);
    }
  };


  const inputClass =
    "w-full rounded-lg border border-[#E8EEEE] bg-white px-3 py-2 font-['Poppins'] text-[14px] text-[#334155] outline-none transition focus:border-[#0F766E] placeholder:text-[#94A3B8]";
  const labelClass =
    "mb-1 block font-['Poppins'] text-[13px] font-medium text-[#475569]";

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-3 py-4 sm:px-5 md:px-6 lg:px-7 xl:px-8">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Poppins'] text-[20px] font-semibold text-[#0F172A]">
            Addresses
          </h1>
          <p className="mt-1 font-['Poppins'] text-[14px] text-[#64748B]">
            {addresses.length}{" "}
            {addresses.length === 1 ? "address" : "addresses"} saved.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2 font-['Poppins'] text-[14px] font-medium text-white transition hover:bg-[#0D5F58]"
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E8EEEE] bg-white py-20">
          <MapPin size={32} className="text-[#94A3B8]" />
          <p className="font-['Poppins'] text-[14px] text-[#64748B]">
            Loading your addresses...
          </p>
        </div>
      ) : addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#E8EEEE] bg-white py-20">
          <MapPin size={32} className="text-[#94A3B8]" />
          <p className="font-['Poppins'] text-[14px] text-[#64748B]">
            You have no saved addresses yet.
          </p>
          <button
            type="button"
            onClick={openAdd}
            className="mt-1 flex items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2 font-['Poppins'] text-[14px] font-medium text-white transition hover:bg-[#0D5F58]"
          >
            <Plus size={16} />
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="relative flex flex-col rounded-xl border border-[#E8EEEE] bg-white p-5 transition-shadow hover:shadow-sm"
            >
              {/* Badges */}
              <div className="mb-3 flex items-center gap-2">
                {addr.label && (
                  <span className="inline-flex rounded-md bg-[#F1F5F9] px-2 py-1 font-['Poppins'] text-[12px] font-medium text-[#475569]">
                    {addr.label}
                  </span>
                )}
                {addr.isDefault && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#ECFDF5] px-2 py-1 font-['Poppins'] text-[12px] font-medium text-[#0F766E]">
                    <Star size={12} className="fill-current" />
                    Default
                  </span>
                )}
              </div>

              {/* Details */}
              <h3 className="font-['Poppins'] text-[15px] font-semibold text-[#0F172A]">
                {addr.fullName}
              </h3>

              <p className="mt-1 flex items-center gap-1.5 font-['Poppins'] text-[14px] text-[#64748B]">
                <Phone size={14} className="shrink-0" />
                {addr.phone}
              </p>

              <p className="mt-2 font-['Poppins'] text-[14px] leading-relaxed text-[#475569]">
                {addr.addressLine}
                <br />
                {addr.city}
                {addr.postalCode ? `, ${addr.postalCode}` : ""}
                <br />
                {addr.country}
              </p>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2 border-t border-[#F1F5F9] pt-4">
                <button
                  type="button"
                  onClick={() => openEdit(addr)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E8EEEE] px-3 py-2 font-['Poppins'] text-[14px] font-medium text-[#334155] transition hover:bg-[#F8FAFC]"
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(addr.id)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#FEE2E2] px-3 py-2 font-['Poppins'] text-[14px] font-medium text-[#EF4444] transition hover:bg-[#FEF2F2]"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------
          ADD / EDIT MODAL
      --------------------------------------------------------- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            {/* Modal header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-['Poppins'] text-[18px] font-semibold text-[#0F172A]">
                {editing ? "Edit Address" : "Add New Address"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#334155]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Full name */}
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>
                  Phone <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+880 1XXXXXXXXX"
                  className={inputClass}
                />
              </div>

              {/* Address line (full width) */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Address <span className="text-[#EF4444]">*</span>
                </label>
                <textarea
                  name="addressLine"
                  value={form.addressLine}
                  onChange={handleChange}
                  rows={2}
                  placeholder="House / Road / Area"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>
                  City <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Dhaka"
                  className={inputClass}
                />
              </div>

              {/* Postal code */}
              <div>
                <label className={labelClass}>Postal Code</label>
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="1207"
                  className={inputClass}
                />
              </div>

              {/* Country */}
              <div>
                <label className={labelClass}>
                  Country <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Bangladesh"
                  className={inputClass}
                />
              </div>

              {/* Label */}
              <div>
                <label className={labelClass}>Label (optional)</label>
                <input
                  name="label"
                  value={form.label}
                  onChange={handleChange}
                  placeholder="Home / Work"
                  className={inputClass}
                />
              </div>

              {/* Default checkbox (full width) */}
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={form.isDefault ?? false}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-[#CBD5E1] accent-[#0F766E]"
                  />
                  <span className="font-['Poppins'] text-[14px] text-[#475569]">
                    Set as default address
                  </span>
                </label>
              </div>

              {/* Buttons (full width) */}
              <div className="mt-2 flex gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-lg border border-[#E8EEEE] px-4 py-2.5 font-['Poppins'] text-[14px] font-medium text-[#334155] transition hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-[#0F766E] px-4 py-2.5 font-['Poppins'] text-[14px] font-medium text-white transition hover:bg-[#0D5F58] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
                >
                  {saving
                    ? "Saving..."
                    : editing
                    ? "Save Changes"
                    : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default AddressesPage;
