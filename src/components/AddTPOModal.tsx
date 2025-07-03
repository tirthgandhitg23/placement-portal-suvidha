
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useTPOData } from "@/hooks/useTPOData";

const AddTPOModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    email: "",
    contact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTPO } = useTPOData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, college, email, contact } = formData;
    
    if (!name.trim() || !college.trim() || !email.trim() || !contact.trim()) {
      return "All fields are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contact.replace(/\s+/g, ''))) {
      return "Please enter a valid 10-digit contact number";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSubmitting(true);
    const result = await addTPO(formData);
    
    if (result.success) {
      setFormData({ name: "", college: "", email: "", contact: "" });
      setOpen(false);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-accent-yellow text-primary-dark hover:bg-yellow-400 font-semibold">
          <Plus className="h-4 w-4 mr-2" />
          Add Details
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-xl text-primary-dark">Add TPO Details</SheetTitle>
          <SheetDescription>
            Enter the details of the Training & Placement Officer
          </SheetDescription>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary-dark font-semibold">
              Name of Person *
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleInputChange}
              className="border-2 border-gray-300 focus:border-accent-yellow"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="college" className="text-primary-dark font-semibold">
              Name of College *
            </Label>
            <Input
              id="college"
              name="college"
              type="text"
              placeholder="Enter college name"
              value={formData.college}
              onChange={handleInputChange}
              className="border-2 border-gray-300 focus:border-accent-yellow"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary-dark font-semibold">
              Email ID *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              className="border-2 border-gray-300 focus:border-accent-yellow"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact" className="text-primary-dark font-semibold">
              Contact No. *
            </Label>
            <Input
              id="contact"
              name="contact"
              type="tel"
              placeholder="Enter 10-digit contact number"
              value={formData.contact}
              onChange={handleInputChange}
              className="border-2 border-gray-300 focus:border-accent-yellow"
              required
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-accent-yellow text-primary-dark hover:bg-yellow-400 font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add TPO Details"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTPOModal;
