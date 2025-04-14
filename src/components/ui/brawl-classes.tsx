
import React from "react";
import { cn } from "@/lib/utils";

interface BrawlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const BrawlButton: React.FC<BrawlButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-md font-medium transition-all transform hover:scale-105 active:scale-95",
        {
          "bg-gradient-to-r from-brawl-blue to-brawl-purple text-white shadow-lg hover:shadow-xl": variant === "primary",
          "bg-gradient-to-r from-brawl-yellow to-brawl-red text-white shadow-lg hover:shadow-xl": variant === "secondary",
          "bg-transparent border-2 border-brawl-purple text-brawl-purple hover:bg-brawl-purple/10": variant === "outline",
          "text-sm px-3 py-1": size === "sm",
          "text-base px-4 py-2": size === "md",
          "text-lg px-6 py-3": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface BrawlCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export const BrawlCard: React.FC<BrawlCardProps> = ({
  children,
  className,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-card border border-border shadow-md transition-all",
        { "animate-pulse-glow": glow },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface BrawlBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "blue" | "purple" | "yellow" | "red";
}

export const BrawlBadge: React.FC<BrawlBadgeProps> = ({
  children,
  variant = "blue",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-brawl-blue/20 text-brawl-blue": variant === "blue",
          "bg-brawl-purple/20 text-brawl-purple": variant === "purple",
          "bg-brawl-yellow/20 text-brawl-yellow/80": variant === "yellow",
          "bg-brawl-red/20 text-brawl-red": variant === "red",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface AnimatedIconProps {
  icon: React.ReactNode;
  animation?: "pulse" | "float" | "spin";
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon,
  animation = "pulse",
}) => {
  return (
    <div
      className={cn(
        "transition-all", 
        {
          "animate-pulse": animation === "pulse",
          "animate-float": animation === "float",
          "animate-spin": animation === "spin",
        }
      )}
    >
      {icon}
    </div>
  );
};

export const GradientText: React.FC<{
  children: React.ReactNode;
  from?: string;
  to?: string;
  className?: string;
}> = ({ children, from = "from-brawl-blue", to = "to-brawl-purple", className }) => {
  return (
    <span 
      className={cn(
        `bg-clip-text text-transparent bg-gradient-to-r ${from} ${to}`,
        className
      )}
    >
      {children}
    </span>
  );
};
