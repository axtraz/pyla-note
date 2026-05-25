"use client";

import {
    AlarmClock,
    Archive,
    Atom,
    BarChart,
    BarChart2,
    BarChart3,
    Bell,
    Binary,
    Book,
    BookMarked,
    Bookmark,
    BookOpen,
    Box,
    Brain,
    Briefcase,
    Brush,
    Bug,
    Building,
    Calendar,
    Camera,
    Check,
    CheckSquare,
    Clipboard,
    ClipboardCheck,
    ClipboardList,
    Clock,
    Cloud,
    Code,
    Code2,
    Coffee,
    Compass,
    Cpu,
    CreditCard,
    Database,
    DollarSign,
    Dumbbell,
    Earth,
    Feather,
    File,
    FileCheck,
    FilePlus,
    FileText,
    Flag,
    Flame,
    Flower,
    Folder,
    FolderOpen,
    Footprints,
    Gamepad2,
    Gem,
    Gift,
    Glasses,
    Globe,
    GraduationCap,
    Grid,
    Hammer,
    Hash,
    Headphones,
    Heart,
    Home,
    Image,
    Key,
    Laptop,
    Layers,
    Layout,
    LayoutGrid,
    Leaf,
    Lightbulb,
    LineChart,
    List,
    ListChecks,
    Lock,
    Mail,
    Map as MapIcon,
    Medal,
    MessageCircle,
    MessageSquare,
    Microscope,
    Moon,
    Mountain,
    Music,
    Package,
    Palette,
    Paperclip,
    Pen,
    Pencil,
    Phone,
    PieChart,
    Plane,
    Play,
    Puzzle,
    Rainbow,
    Rocket,
    Sailboat,
    Search,
    Server,
    Settings,
    Shield,
    ShoppingCart,
    Sliders,
    Smile,
    Snowflake,
    Sparkles,
    Star,
    Sun,
    Sword,
    Tag,
    Target,
    Terminal,
    Timer,
    TrendingUp,
    Trophy,
    Umbrella,
    User,
    UserCheck,
    Users,
    Video,
    Wand2,
    Waves,
    Wind,
    Wrench,
    Zap,
} from "lucide-react";
import type * as React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type IconEntry = {
    name: string;
    component: React.ElementType;
    tags: string[];
};

const ALL_ICONS: IconEntry[] = [
    { name: "Pencil", component: Pencil, tags: ["write", "edit", "note"] },
    { name: "FileText", component: FileText, tags: ["file", "document", "note"] },
    { name: "File", component: File, tags: ["file", "document"] },
    { name: "FilePlus", component: FilePlus, tags: ["file", "new", "add"] },
    { name: "FileCheck", component: FileCheck, tags: ["file", "done", "check"] },
    { name: "Book", component: Book, tags: ["book", "read", "note"] },
    { name: "BookOpen", component: BookOpen, tags: ["book", "read", "open"] },
    {
        name: "BookMarked",
        component: BookMarked,
        tags: ["book", "bookmark", "save"],
    },
    {
        name: "Clipboard",
        component: Clipboard,
        tags: ["clipboard", "copy", "task"],
    },
    {
        name: "ClipboardList",
        component: ClipboardList,
        tags: ["clipboard", "list", "task"],
    },
    {
        name: "ClipboardCheck",
        component: ClipboardCheck,
        tags: ["clipboard", "check", "done"],
    },
    { name: "Pen", component: Pen, tags: ["write", "pen", "note"] },
    { name: "Feather", component: Feather, tags: ["write", "feather", "note"] },
    { name: "Paperclip", component: Paperclip, tags: ["attach", "clip", "file"] },
    {
        name: "Folder",
        component: Folder,
        tags: ["folder", "organize", "project"],
    },
    {
        name: "FolderOpen",
        component: FolderOpen,
        tags: ["folder", "open", "project"],
    },
    { name: "Layers", component: Layers, tags: ["layers", "stack", "organize"] },
    { name: "Tag", component: Tag, tags: ["tag", "label", "category"] },
    { name: "Hash", component: Hash, tags: ["hash", "tag", "category"] },
    { name: "Bookmark", component: Bookmark, tags: ["bookmark", "save", "mark"] },
    { name: "Archive", component: Archive, tags: ["archive", "store", "box"] },
    { name: "List", component: List, tags: ["list", "items", "tasks"] },
    {
        name: "ListChecks",
        component: ListChecks,
        tags: ["list", "check", "tasks"],
    },
    {
        name: "CheckSquare",
        component: CheckSquare,
        tags: ["check", "done", "task"],
    },
    { name: "Grid", component: Grid, tags: ["grid", "layout", "organize"] },
    { name: "Layout", component: Layout, tags: ["layout", "design", "page"] },
    {
        name: "LayoutGrid",
        component: LayoutGrid,
        tags: ["grid", "layout", "tiles"],
    },
    { name: "Star", component: Star, tags: ["star", "favorite", "important"] },
    { name: "Heart", component: Heart, tags: ["heart", "love", "favorite"] },
    { name: "Lightbulb", component: Lightbulb, tags: ["idea", "light", "think"] },
    { name: "Rocket", component: Rocket, tags: ["rocket", "launch", "project"] },
    { name: "Target", component: Target, tags: ["target", "goal", "aim"] },
    { name: "Trophy", component: Trophy, tags: ["trophy", "win", "achievement"] },
    { name: "Medal", component: Medal, tags: ["medal", "achievement", "award"] },
    { name: "Flag", component: Flag, tags: ["flag", "goal", "mark"] },
    { name: "Zap", component: Zap, tags: ["zap", "fast", "energy"] },
    { name: "Flame", component: Flame, tags: ["flame", "fire", "hot"] },
    { name: "Sparkles", component: Sparkles, tags: ["sparkle", "magic", "new"] },
    {
        name: "TrendingUp",
        component: TrendingUp,
        tags: ["trend", "up", "growth"],
    },
    { name: "Gem", component: Gem, tags: ["gem", "diamond", "precious"] },
    { name: "Wand2", component: Wand2, tags: ["wand", "magic", "create"] },
    {
        name: "Briefcase",
        component: Briefcase,
        tags: ["work", "job", "professional"],
    },
    { name: "Laptop", component: Laptop, tags: ["laptop", "computer", "tech"] },
    { name: "Code", component: Code, tags: ["code", "dev", "programming"] },
    { name: "Code2", component: Code2, tags: ["code", "dev", "programming"] },
    {
        name: "Terminal",
        component: Terminal,
        tags: ["terminal", "console", "dev"],
    },
    {
        name: "Database",
        component: Database,
        tags: ["database", "data", "storage"],
    },
    { name: "Server", component: Server, tags: ["server", "backend", "tech"] },
    { name: "Cloud", component: Cloud, tags: ["cloud", "sync", "storage"] },
    { name: "Cpu", component: Cpu, tags: ["cpu", "processor", "tech"] },
    { name: "Brain", component: Brain, tags: ["brain", "think", "ai"] },
    { name: "Bug", component: Bug, tags: ["bug", "debug", "dev"] },
    { name: "Binary", component: Binary, tags: ["binary", "code", "data"] },
    { name: "Atom", component: Atom, tags: ["atom", "science", "react"] },
    { name: "Wrench", component: Wrench, tags: ["wrench", "tool", "fix"] },
    { name: "Hammer", component: Hammer, tags: ["hammer", "build", "tool"] },
    { name: "Puzzle", component: Puzzle, tags: ["puzzle", "problem", "solve"] },
    {
        name: "Calendar",
        component: Calendar,
        tags: ["calendar", "date", "schedule"],
    },
    { name: "Clock", component: Clock, tags: ["clock", "time", "schedule"] },
    { name: "Timer", component: Timer, tags: ["timer", "time", "count"] },
    {
        name: "AlarmClock",
        component: AlarmClock,
        tags: ["alarm", "time", "wake"],
    },
    { name: "Users", component: Users, tags: ["users", "team", "group"] },
    { name: "User", component: User, tags: ["user", "person", "account"] },
    {
        name: "UserCheck",
        component: UserCheck,
        tags: ["user", "check", "verified"],
    },
    {
        name: "MessageSquare",
        component: MessageSquare,
        tags: ["message", "chat", "comment"],
    },
    {
        name: "MessageCircle",
        component: MessageCircle,
        tags: ["message", "chat", "bubble"],
    },
    { name: "Mail", component: Mail, tags: ["mail", "email", "message"] },
    { name: "Phone", component: Phone, tags: ["phone", "call", "contact"] },
    { name: "Smile", component: Smile, tags: ["smile", "happy", "emoji"] },
    { name: "Sun", component: Sun, tags: ["sun", "light", "morning"] },
    { name: "Moon", component: Moon, tags: ["moon", "night", "dark"] },
    { name: "Coffee", component: Coffee, tags: ["coffee", "drink", "morning"] },
    { name: "Leaf", component: Leaf, tags: ["leaf", "nature", "green"] },
    { name: "Flower", component: Flower, tags: ["flower", "nature", "bloom"] },
    {
        name: "Mountain",
        component: Mountain,
        tags: ["mountain", "adventure", "nature"],
    },
    { name: "Waves", component: Waves, tags: ["waves", "ocean", "water"] },
    { name: "Wind", component: Wind, tags: ["wind", "air", "breeze"] },
    { name: "Snowflake", component: Snowflake, tags: ["snow", "cold", "winter"] },
    { name: "Rainbow", component: Rainbow, tags: ["rainbow", "color", "hope"] },
    {
        name: "Umbrella",
        component: Umbrella,
        tags: ["umbrella", "rain", "protect"],
    },
    { name: "Earth", component: Earth, tags: ["earth", "world", "global"] },
    {
        name: "Footprints",
        component: Footprints,
        tags: ["walk", "journey", "steps"],
    },
    { name: "Sailboat", component: Sailboat, tags: ["boat", "sail", "travel"] },
    {
        name: "BarChart",
        component: BarChart,
        tags: ["chart", "data", "analytics"],
    },
    {
        name: "BarChart2",
        component: BarChart2,
        tags: ["chart", "data", "analytics"],
    },
    {
        name: "BarChart3",
        component: BarChart3,
        tags: ["chart", "data", "analytics"],
    },
    {
        name: "LineChart",
        component: LineChart,
        tags: ["chart", "line", "analytics"],
    },
    {
        name: "PieChart",
        component: PieChart,
        tags: ["chart", "pie", "analytics"],
    },
    {
        name: "DollarSign",
        component: DollarSign,
        tags: ["money", "finance", "dollar"],
    },
    {
        name: "CreditCard",
        component: CreditCard,
        tags: ["card", "payment", "finance"],
    },
    {
        name: "ShoppingCart",
        component: ShoppingCart,
        tags: ["shop", "cart", "buy"],
    },
    {
        name: "GraduationCap",
        component: GraduationCap,
        tags: ["school", "learn", "education"],
    },
    {
        name: "Microscope",
        component: Microscope,
        tags: ["science", "research", "lab"],
    },
    { name: "Music", component: Music, tags: ["music", "audio", "sound"] },
    {
        name: "Headphones",
        component: Headphones,
        tags: ["headphones", "music", "audio"],
    },
    { name: "Camera", component: Camera, tags: ["camera", "photo", "picture"] },
    { name: "Image", component: Image, tags: ["image", "photo", "picture"] },
    { name: "Video", component: Video, tags: ["video", "film", "record"] },
    { name: "Play", component: Play, tags: ["play", "media", "start"] },
    { name: "Palette", component: Palette, tags: ["palette", "color", "art"] },
    { name: "Brush", component: Brush, tags: ["brush", "paint", "art"] },
    { name: "Globe", component: Globe, tags: ["globe", "world", "web"] },
    { name: "Map", component: MapIcon, tags: ["map", "location", "navigate"] },
    {
        name: "Compass",
        component: Compass,
        tags: ["compass", "direction", "navigate"],
    },
    { name: "Home", component: Home, tags: ["home", "house", "main"] },
    {
        name: "Building",
        component: Building,
        tags: ["building", "office", "company"],
    },
    { name: "Dumbbell", component: Dumbbell, tags: ["gym", "fitness", "health"] },
    { name: "Gamepad2", component: Gamepad2, tags: ["game", "play", "fun"] },
    { name: "Gift", component: Gift, tags: ["gift", "present", "surprise"] },
    { name: "Glasses", component: Glasses, tags: ["glasses", "read", "see"] },
    { name: "Plane", component: Plane, tags: ["plane", "travel", "fly"] },
    { name: "Sword", component: Sword, tags: ["sword", "fight", "game"] },
    {
        name: "Shield",
        component: Shield,
        tags: ["shield", "protect", "security"],
    },
    { name: "Lock", component: Lock, tags: ["lock", "secure", "private"] },
    { name: "Key", component: Key, tags: ["key", "unlock", "access"] },
    {
        name: "Settings",
        component: Settings,
        tags: ["settings", "config", "manage"],
    },
    { name: "Bell", component: Bell, tags: ["bell", "notification", "alert"] },
    { name: "Package", component: Package, tags: ["package", "box", "delivery"] },
    { name: "Box", component: Box, tags: ["box", "container", "store"] },
    {
        name: "Sliders",
        component: Sliders,
        tags: ["sliders", "control", "adjust"],
    },
];

const CATEGORIES = [
    { label: "All", value: "all" },
    { label: "Notes", value: "note" },
    { label: "Work", value: "work" },
    { label: "Goals", value: "goal" },
    { label: "Nature", value: "nature" },
    { label: "Tech", value: "tech" },
    { label: "Social", value: "social" },
];

const CATEGORY_TAG_MAP: Record<string, string[]> = {
    note: [
        "note",
        "write",
        "edit",
        "file",
        "document",
        "book",
        "read",
        "clipboard",
        "task",
        "pen",
        "feather",
        "attach",
    ],
    work: [
        "work",
        "job",
        "professional",
        "briefcase",
        "schedule",
        "calendar",
        "time",
        "finance",
        "money",
        "analytics",
        "chart",
        "data",
    ],
    goal: [
        "goal",
        "target",
        "star",
        "favorite",
        "important",
        "rocket",
        "launch",
        "trophy",
        "win",
        "achievement",
        "medal",
        "award",
        "idea",
        "light",
        "think",
        "magic",
        "create",
        "sparkle",
        "new",
        "trend",
        "growth",
        "gem",
    ],
    nature: [
        "nature",
        "leaf",
        "flower",
        "tree",
        "mountain",
        "waves",
        "ocean",
        "water",
        "wind",
        "air",
        "snow",
        "cold",
        "winter",
        "rainbow",
        "color",
        "hope",
        "umbrella",
        "rain",
        "protect",
        "earth",
        "world",
        "global",
        "walk",
        "journey",
        "steps",
        "grow",
        "boat",
        "sail",
        "travel",
        "sun",
        "moon",
    ],
    tech: [
        "tech",
        "code",
        "dev",
        "programming",
        "terminal",
        "console",
        "database",
        "data",
        "storage",
        "server",
        "backend",
        "cloud",
        "sync",
        "cpu",
        "processor",
        "brain",
        "think",
        "ai",
        "bug",
        "debug",
        "binary",
        "atom",
        "react",
        "tool",
        "fix",
        "build",
        "solve",
        "problem",
    ],
    social: [
        "social",
        "users",
        "team",
        "group",
        "user",
        "person",
        "account",
        "message",
        "chat",
        "comment",
        "bubble",
        "mail",
        "email",
        "phone",
        "call",
        "contact",
        "happy",
        "emoji",
        "school",
        "learn",
        "education",
    ],
};

interface IconPickerDialogProps {
    currentIcon?: string;
    onIconSelect: (iconName: string) => void;
    projectName?: string;
    children?: React.ReactNode;
}

export function IconPickerDialog({
    currentIcon = "Folder",
    onIconSelect,
    projectName = "My project",
    children,
}: IconPickerDialogProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [selected, setSelected] = useState(currentIcon);
    const [hovered, setHovered] = useState<string | null>(null);

    const filtered = useMemo(() => {
        let icons = ALL_ICONS;

        if (category !== "all") {
            const tags = CATEGORY_TAG_MAP[category] ?? [];
            icons = icons.filter(icon => icon.tags.some(t => tags.includes(t)));
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            icons = icons.filter(icon => icon.name.toLowerCase().includes(q) || icon.tags.some(t => t.includes(q)));
        }

        return icons;
    }, [search, category]);

    const SelectedIcon = ALL_ICONS.find(i => i.name === selected)?.component ?? Folder;
    const HoveredIcon = hovered ? ALL_ICONS.find(i => i.name === hovered)?.component : null;

    const handleConfirm = () => {
        onIconSelect(selected);
        setOpen(false);
    };

    const handleOpenChange = (val: boolean) => {
        setOpen(val);
        if (val) {
            setSelected(currentIcon);
            setSearch("");
            setCategory("all");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children ?? (
                    <Button className="border-input dark:bg-input/30 hover:bg-accent mt-2 flex h-9 w-full min-w-0 items-center gap-2 rounded-md border bg-transparent px-3 py-1 text-left text-sm shadow-xs transition-[color,box-shadow] outline-none">
                        <SelectedIcon className="text-muted-foreground size-4 shrink-0" />
                        <span className={cn(selected ? "text-foreground" : "text-muted-foreground")}>
                            {selected || "Choose an icon"}
                        </span>
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-2xl p-0">
                <DialogHeader className="border-border border-b px-6 pt-6 pb-4">
                    <DialogTitle className="flex items-center gap-3 text-base font-semibold">
                        <span className="bg-muted border-border flex size-9 items-center justify-center rounded-xl border">
                            <SelectedIcon className="text-foreground size-5" />
                        </span>
                        <span>
                            Project icon
                            <span className="text-muted-foreground mt-0.5 block text-xs font-normal">
                                {projectName}
                            </span>
                        </span>
                    </DialogTitle>
                    <DialogDescription className="sr-only">Choose a icon.</DialogDescription>
                </DialogHeader>
                <div className="border-border bg-muted/30 space-y-3 border-b px-6 py-4">
                    <div className="relative">
                        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                            placeholder="Search an icon…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="bg-background border-border h-9 rounded-lg pl-9 text-sm"
                            autoFocus
                        />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {CATEGORIES.map(cat => (
                            <Button
                                key={cat.value}
                                onClick={() => setCategory(cat.value)}
                                className={cn(
                                    "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                                    category === cat.value
                                        ? "bg-foreground text-background border-foreground"
                                        : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground",
                                )}
                            >
                                {cat.label}
                            </Button>
                        ))}
                    </div>
                </div>
                <ScrollArea className="h-[320px]">
                    <div className="p-4">
                        {filtered.length === 0 ? (
                            <div className="text-muted-foreground flex h-48 flex-col items-center justify-center gap-2">
                                <Search className="size-8 opacity-30" />
                                <p className="text-sm">No icons found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-8 gap-1.5">
                                {filtered.map(({ name, component: Icon }) => (
                                    <Button
                                        key={name}
                                        onClick={() => setSelected(name)}
                                        onMouseEnter={() => setHovered(name)}
                                        onMouseLeave={() => setHovered(null)}
                                        title={name}
                                        className={cn(
                                            "relative flex items-center justify-center aspect-square rounded-xl border transition-all duration-150",
                                            selected === name
                                                ? "bg-foreground text-background border-foreground shadow-sm scale-105"
                                                : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground hover:bg-muted",
                                        )}
                                    >
                                        <Icon className="size-[18px]" />
                                        {selected === name && (
                                            <span className="bg-background border-border absolute -top-1 -right-1 flex size-3 items-center justify-center rounded-full border">
                                                <Check className="text-foreground size-2" />
                                            </span>
                                        )}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="border-border bg-muted/30 flex items-center justify-between gap-3 border-t px-6 py-4">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        {HoveredIcon ? (
                            <>
                                <HoveredIcon className="size-4" />
                                <span className="font-mono text-xs">{hovered}</span>
                            </>
                        ) : (
                            <span className="text-xs">
                                {filtered.length} icon{filtered.length > 1 ? "s" : ""}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setOpen(false)} className="rounded-lg">
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleConfirm}
                            className="gap-1.5 rounded-lg"
                            disabled={selected === currentIcon}
                        >
                            <Check className="size-3.5" />
                            Apply
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
