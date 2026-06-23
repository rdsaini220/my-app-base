import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '@/components/ui/atoms/Avatar';
import { cn } from '@/utils/cn';
import { colors } from '@/core/theme/colors';

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarItemType = 'image' | 'text' | 'icon';

export interface AvatarItemData {
  /** Unique key for this item */
  id: string | number;
  /** Rendering mode */
  type: AvatarItemType;
  /**
   * Content value:
   * - `image` → URI string
   * - `text`  → name string (initials auto-extracted by the Avatar atom)
   * - `icon`  → Ionicons icon name string
   */
  value: string;
  /** Optional Tailwind bg class override, e.g. "bg-primary/10" */
  bgColor?: string;
}

export interface AvatarGroupProps {
  /** Ordered list of avatar data */
  data: AvatarItemData[];
  /** Maximum avatars before overflow badge (default 4) */
  maxVisible?: number;
  /** Size forwarded to each Avatar atom */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** White ring border between overlapping avatars */
  hasBorder?: boolean;
  /** Extra className on the row wrapper */
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BG_PALETTE = [
  'bg-primary/10',
  'bg-success/10',
  'bg-warning/10',
  'bg-error/10',
] as const;

const ICON_SIZE: Record<NonNullable<AvatarGroupProps['size']>, number> = {
  xs: 12, sm: 16, md: 20, lg: 24, xl: 32, '2xl': 48,
};

const BADGE_TEXT: Record<NonNullable<AvatarGroupProps['size']>, string> = {
  xs: 'text-[9px]',
  sm: 'text-[10px]',
  md: 'text-xs font-semibold',
  lg: 'text-sm font-bold',
  xl: 'text-base font-bold',
  '2xl': 'text-xl font-bold',
};

// ─── Icon avatar content ──────────────────────────────────────────────────────

const IconContent = memo(
  ({ name, size }: { name: string; size: NonNullable<AvatarGroupProps['size']> }) => (
    <Ionicons name={name as any} size={ICON_SIZE[size]} color={colors.primary} />
  ),
);
IconContent.displayName = 'IconContent';

// ─── AvatarGroup ──────────────────────────────────────────────────────────────

export const AvatarGroup = memo(({
  data,
  maxVisible = 4,
  size = 'md',
  hasBorder = true,
  className = '',
}: AvatarGroupProps) => {

  const { visibleItems, remainingCount, showOverflow } = useMemo(() => {
    const total = data.length;
    const overflow = total > maxVisible;
    const visibleCount = overflow ? maxVisible - 1 : total;
    return {
      visibleItems:   data.slice(0, visibleCount),
      remainingCount: total - visibleCount,
      showOverflow:   overflow,
    };
  }, [data, maxVisible]);

  const borderClass = hasBorder ? 'border-2 border-card' : '';

  // ── Single item shortcut ──────────────────────────────────────────────────
  if (visibleItems.length === 1 && !showOverflow) {
    const item = visibleItems[0];
    const bg = item.bgColor ?? BG_PALETTE[0];

    if (item.type === 'icon') {
      return (
        <Avatar size={size} className={cn(bg, borderClass)}>
          <IconContent name={item.value} size={size} />
        </Avatar>
      );
    }

    return (
      <Avatar
        source={item.type === 'image' ? item.value : undefined}
        name={item.type === 'text'  ? item.value : undefined}
        size={size}
        className={cn(bg, borderClass)}
      />
    );
  }

  // ── Stacked row ───────────────────────────────────────────────────────────
  return (
    <View className={cn('flex-row items-center', className)}>
      {visibleItems.map((item, index) => {
        const bg = item.bgColor ?? BG_PALETTE[index % BG_PALETTE.length];
        const stackClass = index > 0 ? '-ml-3' : '';

        if (item.type === 'icon') {
          return (
            <Avatar
              key={item.id}
              size={size}
              className={cn(bg, borderClass, stackClass)}
            >
              <IconContent name={item.value} size={size} />
            </Avatar>
          );
        }

        return (
          <Avatar
            key={item.id}
            source={item.type === 'image' ? item.value : undefined}
            name={item.type === 'text'  ? item.value : undefined}
            size={size}
            className={cn(bg, borderClass, stackClass)}
          />
        );
      })}

      {/* Overflow badge */}
      {showOverflow && (
        <Avatar size={size} className={cn('bg-foreground -ml-3', borderClass)}>
          <Text className={cn(BADGE_TEXT[size], 'text-card font-bold font-sans')}>
            +{remainingCount}
          </Text>
        </Avatar>
      )}
    </View>
  );
});

AvatarGroup.displayName = 'AvatarGroup';
