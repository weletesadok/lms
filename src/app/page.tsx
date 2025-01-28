"use client";

import React, { useState } from "react";
import {
  Button,
  TextInput,
  PasswordInput,
  Group,
  MultiSelect,
  Select,
  Box,
  Notification,
  Textarea,
  Flex,
  Text,
} from "@mantine/core";

interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface UserFormValues {
  name: {
    firstName: string;
    fatherName: string;
    grandFatherName: string;
    motherName: string;
  };
  email: string;
  userName: string;
  phoneNumber: string[];
  address: Address;
  password: string;
  roles: string[];
  nationalIdNumber: string;
  birthDate: string;
  disabilityStatus: string;
}

export default function RegisterUser() {
  const [formData, setFormData] = useState<UserFormValues>({
    name: {
      firstName: "",
      fatherName: "",
      grandFatherName: "",
      motherName: "",
    },
    email: "",
    userName: "",
    phoneNumber: ["", ""],
    address: {
      street1: "",
      street2: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
    password: "",
    roles: [],
    nationalIdNumber: "",
    birthDate: "",
    disabilityStatus: "none",
  });

  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("name.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          [fieldName]: value,
        },
      }));
    } else if (name.startsWith("address.")) {
      const fieldName = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newArray = [...formData.phoneNumber];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      phoneNumber: newArray,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmissionMessage("User registered successfully!");
        setFormData({
          name: {
            firstName: "",
            fatherName: "",
            grandFatherName: "",
            motherName: "",
          },
          email: "",
          userName: "",
          phoneNumber: ["", ""],
          address: {
            street1: "",
            street2: "",
            city: "",
            state: "",
            country: "",
            zip: "",
          },
          password: "",
          roles: [],
          nationalIdNumber: "",
          birthDate: "",
          disabilityStatus: "none",
        });
      } else {
        const error = await response.json();
        setSubmissionMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setSubmissionMessage("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-screen overflow-auto flex items-center justify-center"
    >
      <div className="flex flex-wrap gap-4 w-[70%] m-auto p-4 shadow-2xl shadow-green-400">
        <div className="text-center w-full">
          <Text variant="gradient" className="font-semibold">
            Registration Form
          </Text>
        </div>
        <TextInput
          label="First Name"
          name="name.firstName"
          value={formData.name.firstName}
          onChange={handleInputChange}
          placeholder="John"
          required
        />
        <TextInput
          label="Father's Name"
          name="name.fatherName"
          value={formData.name.fatherName}
          onChange={handleInputChange}
          placeholder="Doe"
          required
        />
        <TextInput
          label="Grandfather's Name"
          name="name.grandFatherName"
          value={formData.name.grandFatherName}
          onChange={handleInputChange}
          placeholder="Smith"
        />
        <TextInput
          label="Mother's Name"
          name="name.motherName"
          value={formData.name.motherName}
          onChange={handleInputChange}
          placeholder="Jane"
        />
        <TextInput
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.doe@example.com"
          required
        />
        <TextInput
          label="Username"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          placeholder="johndoe123"
          required
        />
        <TextInput
          label="Phone Number 1"
          name="phoneNumber0"
          value={formData.phoneNumber[0]}
          onChange={(e) => handleArrayInputChange(e, 0)}
          placeholder="+1234567890"
          required
        />
        <TextInput
          label="Phone Number 2"
          name="phoneNumber1"
          value={formData.phoneNumber[1]}
          onChange={(e) => handleArrayInputChange(e, 1)}
          placeholder="+0987654321"
        />
        <TextInput
          label="Street 1"
          name="address.street1"
          value={formData.address.street1}
          onChange={handleInputChange}
          placeholder="123 Main St"
          required
        />
        <TextInput
          label="Street 2"
          name="address.street2"
          value={formData.address.street2}
          onChange={handleInputChange}
          placeholder="Apt 4B"
        />
        <TextInput
          label="City"
          name="address.city"
          value={formData.address.city}
          onChange={handleInputChange}
          placeholder="New York"
          required
        />
        <TextInput
          label="State"
          name="address.state"
          value={formData.address.state}
          onChange={handleInputChange}
          placeholder="NY"
          required
        />
        <TextInput
          label="Country"
          name="address.country"
          value={formData.address.country}
          onChange={handleInputChange}
          placeholder="USA"
          required
        />
        <TextInput
          label="ZIP Code"
          name="address.zip"
          value={formData.address.zip}
          onChange={handleInputChange}
          placeholder="10001"
          required
        />
        <MultiSelect
          label="Roles"
          name="roles"
          data={["student", "admin", "teacher"]}
          value={formData.roles}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              roles: value as string[],
            }))
          }
          required
          className="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1"
        />
        <TextInput
          label="National ID Number"
          name="nationalIdNumber"
          value={formData.nationalIdNumber}
          onChange={handleInputChange}
          placeholder="1234567890"
          required
        />
        <TextInput
          label="Birth Date (YYYY-MM-DD)"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleInputChange}
          placeholder="1990-01-01"
          required
        />
        <Select
          label="Disability Status"
          name="disabilityStatus"
          data={[
            { value: "none", label: "None" },
            { value: "physical", label: "Physical" },
            { value: "mental", label: "Mental" },
          ]}
          value={formData.disabilityStatus}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              disabilityStatus: value as string,
            }))
          }
        />
        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="securePassword123"
          required
          className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-1"
        />
        <div className="w-full flex justify-start p-4">
          <Button
            type="submit"
            variant="filled"
            color="blue"
            className="w-full"
            loading
          >
            Register
          </Button>
        </div>
        {submissionMessage && (
          <Notification
            onClose={() => setSubmissionMessage(null)}
            color={submissionMessage.includes("Error") ? "red" : "green"}
          >
            {submissionMessage}
          </Notification>
        )}
      </div>
    </form>
  );
}
