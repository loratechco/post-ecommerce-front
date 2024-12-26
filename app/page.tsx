import '../components/landing/landing.module.css';
import {SelectBox} from '@/components/landing/shipping-selector/ShippingSelector';

export default function Page() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SelectBox />
    </div>
  );
}

