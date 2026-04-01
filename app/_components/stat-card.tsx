import { Badge } from "@/_components/ui/badge";
import { Card, CardContent } from "@/_components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <Card className="bg-primary/8 ring-primary/15">
      <CardContent className="flex flex-col items-center gap-5">
        <Badge className="bg-primary/10 p-2.5">
          <Icon className="text-primary size-4" />
        </Badge>
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-heading text-2xl leading-[1.15] font-semibold">
            {value}
          </span>
          <span className="font-heading text-muted-foreground text-xs leading-[1.4]">
            {label}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
