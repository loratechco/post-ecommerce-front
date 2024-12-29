import {Globe, Package, Info, Briefcase, Newspaper, HelpCircle, MessageCircle, Edit3, MapPin, DollarSign, Truck, Users } from 'lucide-react';

const ICON_SIZE = 18 as const

export const navbarStructur = [
  {
    title: 'Postal Services',
    items: [
      { href: '#services', titleItem: 'Our Services', icon: <Package size={ICON_SIZE}/> },
      { href: '#pricing', titleItem: 'Pricing', icon: <DollarSign size={ICON_SIZE}/> },
      { href: '#branches', titleItem: 'Branches and Agents', icon: <MapPin size={ICON_SIZE}/> },
    ],
  },
  {
    title: 'Shipping Solutions',
    items: [
      { href: '#domestic', titleItem: 'Domestic Shipping', icon: <Truck size={ICON_SIZE}/> },
      { href: '#international', titleItem: 'International Shipping', icon: <Globe size={ICON_SIZE}/> },
      { href: '#tracking', titleItem: 'Track Your Parcel', icon: <Package size={ICON_SIZE}/> },
    ],
  },
  {
    title: 'Customer Support',
    items: [
      { href: '#help', titleItem: 'Help Center', icon: <HelpCircle size={ICON_SIZE}/> },
      { href: '#livechat', titleItem: 'Live Chat', icon: <MessageCircle size={ICON_SIZE}/> },
      { href: '#feedback', titleItem: 'Feedback', icon: <Edit3 size={ICON_SIZE}/> },
    ],
  },
  {
    title: 'Company Info',
    items: [
      { href: '#about', titleItem: 'About Us', icon: <Info size={ICON_SIZE}/> },
      { href: '#careers', titleItem: 'Careers', icon: <Briefcase size={ICON_SIZE}/> },
      { href: '#news', titleItem: 'News and Updates', icon: <Newspaper size={ICON_SIZE}/> },
    ],
  },
];


