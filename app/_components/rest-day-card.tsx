import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Zap } from "lucide-react";

const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
};

interface RestDayCardProps {
  weekDay: string;
}

export default function RestDayCard({ weekDay }: RestDayCardProps) {
  return (
    <Card className="bg-muted/50">
      <CardContent className="flex flex-col justify-between gap-3">
        <Badge className="font-heading bg-input text-foreground text-xs font-semibold uppercase">
          <Calendar size="3.5" />
          {WEEKDAY_LABELS[weekDay]}
        </Badge>

        <CardHeader className="flex items-center justify-between p-0">
          <CardTitle className="font-heading flex items-center gap-2 leading-relaxed font-semibold">
            <Zap className="text-primary fill-primary size-5" />
            <span className="text-2xl">Descanso</span>
          </CardTitle>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
