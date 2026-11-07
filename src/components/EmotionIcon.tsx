import React from 'react';
import {
  Wind,
  UserX,
  Flame,
  Clock,
  ShieldAlert,
  HeartCrack,
  HelpCircle,
  AlertTriangle,
  BatteryLow,
  Sparkles,
  LucideProps
} from 'lucide-react';

interface EmotionIconProps extends LucideProps {
  name: string;
}

export const EmotionIcon: React.FC<EmotionIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Ansiedad':
    case 'Wind':
      return <Wind {...props} />;
    case 'Soledad':
    case 'UserX':
      return <UserX {...props} />;
    case 'Frustración':
    case 'Flame':
      return <Flame {...props} />;
    case 'Aburrimiento':
    case 'Clock':
      return <Clock {...props} />;
    case 'Inseguridad':
    case 'ShieldAlert':
      return <ShieldAlert {...props} />;
    case 'Rechazo':
    case 'HeartCrack':
      return <HeartCrack {...props} />;
    case 'Culpa':
    case 'HelpCircle':
      return <HelpCircle {...props} />;
    case 'Enojo':
    case 'AlertTriangle':
      return <AlertTriangle {...props} />;
    case 'Cansancio':
    case 'BatteryLow':
      return <BatteryLow {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};
