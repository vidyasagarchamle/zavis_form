import * as z from "zod";

// Form validation schema
export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(8, "Please enter a valid phone number"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  eid: z.string().length(4, "EID must be exactly 4 digits"),
  plan: z.string().min(1, "Plan is required"),
  nationality: z.string().optional(),
});

// Type for form data based on schema
export type FormData = z.infer<typeof formSchema>;

// Type for API response
export interface ApiResponse {
  success: boolean;
  message: string;
  callData?: any;
}

// Type for Zavis API payload
export interface ZavisApiPayload {
  agent_id: string;
  recipient: {
    name: string;
    phoneNumber: string;
  };
  dynamicVariables: {
    emid: string;
    location: string;
    nationality: string;
    phone_number: string;
    plan: string;
  };
} 