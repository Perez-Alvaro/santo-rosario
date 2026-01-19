"use client";

import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface SectionTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SectionTabs({ tabs, activeTab, onTabChange }: SectionTabsProps) {
  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-2xl mx-auto">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex-shrink-0 px-5 py-4 text-sm font-medium transition-colors relative",
                "hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
