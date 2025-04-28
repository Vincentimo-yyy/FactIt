'use client';

import { useState } from 'react';
import {
  ChevronRight,
  Globe,
  User,
  Shield,
  Bell,
  FileText,
} from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { SettingsItem } from '@/components/ui/settings-item';
import { CustomDropdown } from '@/components/ui/custom-dropdown';
import { ToggleSwitch } from '@/components/ui/toggle-switch';

// Define the settings categories and their features
const settingsCategories = [
  {
    id: 'general',
    title: 'General Settings',
    description:
      'Language preferences, Timezone selection, Dark mode / Light mode toggle',
    icon: Globe,
    features: [
      { id: 'language', name: 'Language preferences' },
      { id: 'timezone', name: 'Timezone selection' },
      { id: 'theme', name: 'Dark mode/Light mode' },
    ],
  },
  {
    id: 'profile',
    title: 'User Profile Settings',
    description:
      'Edit profile information, Change email/password, Link social accounts',
    icon: User,
    features: [
      { id: 'edit-profile', name: 'Edit profile information' },
      { id: 'change-credentials', name: 'Change email/password' },
      { id: 'social-accounts', name: 'Link social accounts' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & Security Settings',
    description:
      'Two-factor authentication, Session/device management, Login activity history, Set account visibility, Block/report user list',
    icon: Shield,
    features: [
      { id: '2fa', name: 'Two-factor authentication' },
      { id: 'sessions', name: 'Session/device management' },
      { id: 'login-history', name: 'Login activity history' },
      { id: 'visibility', name: 'Set account visibility' },
      { id: 'block-report', name: 'Block/report user list' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    description:
      'Enable/disable email or push notifications for: New fact-checks on followed topics, Comments or replies, Weekly summaries or alerts, Admin announcements',
    icon: Bell,
    features: [
      { id: 'fact-checks', name: 'New fact-checks on followed topics' },
      { id: 'comments', name: 'Comments or replies' },
      { id: 'summaries', name: 'Weekly summaries or alerts' },
      { id: 'announcements', name: 'Admin announcements' },
    ],
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    description:
      'Download my data (GDPR compliant), Request account deletion, Terms of Service & Privacy Policy access',
    icon: FileText,
    features: [
      { id: 'download-data', name: 'Download my data (GDPR compliant)' },
      { id: 'delete-account', name: 'Request account deletion' },
      { id: 'terms', name: 'Terms of Service & Privacy Policy access' },
    ],
  },
];

// Language options
const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

// Timezone options
const timezoneOptions = [
  { value: 'gmt+8', label: 'Wednesday, April 16, 2025 (GMT+8)' },
  { value: 'utc', label: 'Wednesday, April 16, 2025 (UTC)' },
  { value: 'est', label: 'Wednesday, April 16, 2025 (EST)' },
  { value: 'pst', label: 'Wednesday, April 16, 2025 (PST)' },
];

// Account visibility options
const visibilityOptions = [
  { value: 'public', label: 'Public - Anyone can see your profile' },
  {
    value: 'followers',
    label: 'Followers only - Only followers can see your profile',
  },
  { value: 'private', label: 'Private - Only you can see your profile' },
];

// Email notification options
const emailOptions = [
  { value: 'all', label: 'All emails' },
  { value: 'important', label: 'Important only' },
  { value: 'none', label: 'No emails' },
];

export default function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectedCategoryData = settingsCategories.find(
    (category) => category.id === selectedCategory,
  );

  // Update the renderModalContent function to use our new CustomDropdown component
  const renderModalContent = () => {
    switch (selectedCategory) {
      case 'general':
        return (
          <>
            <SettingsItem label="Language preferences">
              <CustomDropdown options={languageOptions} defaultValue="en" />
            </SettingsItem>
            <SettingsItem label="Timezone selection">
              <CustomDropdown options={timezoneOptions} defaultValue="gmt+8" />
            </SettingsItem>
            <SettingsItem label="Dark mode/Light mode">
              <ToggleSwitch defaultChecked={true} showIcons={true} />
            </SettingsItem>
          </>
        );
      case 'profile':
        return (
          <>
            <SettingsItem label="Full name">
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F3E9E]"
              />
            </SettingsItem>
            <SettingsItem label="Email address">
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F3E9E]"
              />
            </SettingsItem>
            <SettingsItem label="Password">
              <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors">
                Change password
              </button>
            </SettingsItem>
            <SettingsItem label="Social accounts">
              <div className="flex flex-col gap-2">
                <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors text-left">
                  Connect Google
                </button>
                <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors text-left">
                  Connect Facebook
                </button>
              </div>
            </SettingsItem>
          </>
        );
      case 'privacy':
        return (
          <>
            <SettingsItem label="Two-factor authentication">
              <ToggleSwitch />
            </SettingsItem>
            <SettingsItem label="Account visibility">
              <CustomDropdown
                options={visibilityOptions}
                defaultValue="public"
              />
            </SettingsItem>
            <SettingsItem label="Login activity">
              <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors">
                View activity
              </button>
            </SettingsItem>
            <SettingsItem label="Active sessions">
              <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors">
                Manage sessions
              </button>
            </SettingsItem>
            <SettingsItem label="Blocked users">
              <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors">
                Manage blocked users
              </button>
            </SettingsItem>
          </>
        );
      case 'notifications':
        return (
          <>
            <SettingsItem label="Email notifications">
              <CustomDropdown options={emailOptions} defaultValue="important" />
            </SettingsItem>
            <SettingsItem label="Push notifications">
              <ToggleSwitch defaultChecked={true} />
            </SettingsItem>
            <SettingsItem label="New fact-checks">
              <ToggleSwitch defaultChecked={true} />
            </SettingsItem>
            <SettingsItem label="Comments and replies">
              <ToggleSwitch defaultChecked={true} />
            </SettingsItem>
            <SettingsItem label="Weekly summaries">
              <ToggleSwitch />
            </SettingsItem>
            <SettingsItem label="Admin announcements">
              <ToggleSwitch defaultChecked={true} />
            </SettingsItem>
          </>
        );
      case 'legal':
        return (
          <>
            <SettingsItem label="Download my data">
              <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors">
                Download data
              </button>
            </SettingsItem>
            <SettingsItem label="Delete my account">
              <button className="w-full h-10 py-2 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                Request deletion
              </button>
            </SettingsItem>
            <SettingsItem label="Terms of Service">
              <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors">
                View terms
              </button>
            </SettingsItem>
            <SettingsItem label="Privacy Policy">
              <button className="w-full h-10 py-2 px-4 bg-[#F3F0FF] text-[#4F3E9E] rounded-lg hover:bg-[#E6E0FF] transition-colors">
                View policy
              </button>
            </SettingsItem>
          </>
        );
      default:
        return <p>Select a category to view settings</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-arial">
      <h1 className="text-3xl font-bold text-secondary mb-6">Settings</h1>

      <div className="space-y-4">
        {settingsCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg border p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <category.icon className="h-6 w-6 text-secondary mr-3" />
                <div>
                  <h2 className="text-lg font-semibold">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying category features */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedCategoryData?.title || ''}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
}
