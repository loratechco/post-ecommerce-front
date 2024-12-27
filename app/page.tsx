import getToken from '@/lib/auth/getSession';
import '../components/landing/landing.module.css';
import {SelectBox} from '@/components/landing/shipping-selector/ShippingSelector';

export default async function Page() {
  const {token} = JSON.parse(await getToken())
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SelectBox token={token}/>
    </div>
  );
}

