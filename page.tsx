"use client";

import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(8, "Please enter a valid phone number"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  eid: z.string().length(4, "EID must be exactly 4 digits"),
  plan: z.string().min(1, "Plan is required"),
  nationality: z.string().optional(),
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      location: "",
      eid: "",
      plan: "",
      nationality: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-[480px]">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 rounded-lg">
          <CardHeader className="space-y-1.5 pb-6">
            <CardTitle className="text-2xl font-medium text-gray-800 text-center">
              Sales Verification
            </CardTitle>
            <CardDescription className="text-gray-500 text-center text-sm">
              Please fill in the details below to submit your verification request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
                          {...field} 
                          className="h-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-300/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Enter your phone number" 
                          {...field} 
                          className="h-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-300/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Location</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your location" 
                          {...field} 
                          className="h-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-300/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">EID</FormLabel>
                      <FormControl>
                        <Input
                          maxLength={4}
                          placeholder="Last 4 digits of EID"
                          {...field}
                          className="h-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-300/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Plan</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your plan" 
                          {...field} 
                          className="h-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-300/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 text-sm font-medium">Nationality</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your nationality" 
                          {...field} 
                          className="h-10 bg-white border-gray-200 focus:border-gray-400 focus:ring-gray-300/20"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-10 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting & Initiating Call...
                    </div>
                  ) : (
                    "Submit Verification"
                  )}
                </Button>

                {error && (
                  <div className="p-3 text-xs bg-gray-50 border border-gray-200 text-gray-800 rounded-md mt-4">
                    <div className="font-medium text-red-500 mb-1">Error</div>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 text-xs bg-gray-50 border border-gray-200 text-gray-800 rounded-md mt-4">
                    <div className="font-medium text-gray-900 mb-1">Verification call initiated!</div>
                    Your form has been submitted successfully and a verification call will be made to your phone shortly.
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 