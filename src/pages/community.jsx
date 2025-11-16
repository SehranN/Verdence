import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, ChevronDown, Flame, Hash, Lock, Search, Send, Shield, Sparkles, Users2, Radio, MessageCircle, TrendingUp, Eye, FileText, Building2, Plus, BellRing } from "lucide-react";

// --- mock data --------------------------------------------------------------
const MOCK_INSTRUMENTS = [
  { id: "SX5E_DEC", label: "SX5E • TRF • Dec" },
  { id: "SPX_DEC", label: "SPX • Futures • Dec" },
  { id: "NIKKEI_DEC", label: "NIKKEI • Futures • Dec" },
  { id: "HANG_DEC", label: "HANG • Futures • Dec" },
];

const MOCK_ROOMS = [
  { id: "r1", name: "SX5E • Dec Flow", kind: "instrument", visibility: "cross-firm", members: 241 },
  { id: "r2", name: "Macro AM Rundown", kind: "topic", visibility: "cross-firm", members: 612 },
  { id: "r3", name: "Firm Only – Index Options", kind: "firm", visibility: "firm-only", members: 28 },
  { id: "r4", name: "HANG • Price Talk", kind: "instrument", visibility: "cross-firm", members: 120 },
];

const TAGS = {
  instruments: ["SX5E", "S3DE", "DAX", "NIKKEI", "HSI", "ES", "NQ"],
  markets: ["EU", "US", "APAC"],
  style: ["Conservative", "Moderate", "Aggressive"],
};

const MOCK_USERS = [
  { id: "u1", name: "Phillipe Laget", firm: "Merrill Lynch", desk: "Index Derivs", initials: "PL", online: true, role: "Sell-side trader", bio: "Index options / TRF, dispersion, vol surfaces.", instruments: ["SX5E","DAX","ES"], markets: ["EU","US"], style: "Conservative", activity: 86, overlap: 0.82, timezone: "CET" },
  { id: "u2", name: "Peter Holdway", firm: "Barclays", desk: "Delta One", initials: "PH", online: true, role: "Buy-side quant", bio: "Systematic vol carry + tail risk overlays.", instruments: ["S3DE","SX5E"], markets: ["EU"], style: "Aggressive", activity: 72, overlap: 0.64, timezone: "GMT" },
  { id: "u3", name: "Franc Brabes", firm: "BNP Paribas", desk: "Index Options", initials: "FB", online: false, role: "PM", bio: "Cross‑regional index futures & options; calendar spreads.", instruments: ["SX5E","NIKKEI","HSI"], markets: ["EU","APAC"], style: "Moderate", activity: 65, overlap: 0.59, timezone: "CET" },
  { id: "u4", name: "Ava Chen", firm: "Citi", desk: "Macro", initials: "AC", online: true, role: "HF trader", bio: "Intraday futures + microstructure, stat‑arb signals.", instruments: ["ES","NQ","RTY"], markets: ["US"], style: "Aggressive", activity: 93, overlap: 0.41, timezone: "EST" },
];

const seedPosts = () => ([
  {
    id: "m1",
    roomId: "r1",
    author: MOCK_USERS[0],
    body: "Two-way calendar spread interest in SX5E TRF Z6 vs U6 1.2/1.9. Ping if axes.",
    instruments: ["SX5E_DEC"],
    visibility: "cross-firm",
    ts: Date.now() - 1000 * 60 * 6,
    reactions: { up: 7, insight: 4, agree: 9 },
    replies: 3,
  },
  {
    id: "m2",
    roomId: "r2",
    author: MOCK_USERS[1],
    body: "US CPI whisper softer; clients leaning long gamma into print. Street marking vols 0.3 lower on the day.",
    instruments: ["SPX_DEC"],
    visibility: "cross-firm",
    ts: Date.now() - 1000 * 60 * 20,
    reactions: { up: 12, insight: 10, agree: 6 },
    replies: 5,
  },
  {
    id: "m3",
    roomId: "r3",
    author: MOCK_USERS[2],
    body: "Firm-only: client RFQ likely in wings; ensure restricted list respected; keep color high-level.",
    instruments: ["SX5E_DEC"],
    visibility: "firm-only",
    ts: Date.now() - 1000 * 60 * 2,
    reactions: { up: 2, insight: 3, agree: 1 },
    replies: 1,
  },
]);

// --- small helpers ----------------------------------------------------------
const timeAgo = (t) => {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h`;
};

function ScoreChip({ score }) {
  return (
    <Badge variant="secondary" className="px-2 py-0 text-xs">
      <Flame className="mr-1 h-3 w-3" /> {score.toFixed(2)}
    </Badge>
  );
}

function VisibilityChip({ v }) {
  return (
    <Badge className="px-2 py-0 text-xs" variant={v === "firm-only" ? "destructive" : "outline"}>
      {v === "firm-only" ? (<><Lock className="mr-1 h-3 w-3" /> Firm-only</>) : (<><Users2 className="mr-1 h-3 w-3" /> Cross-firm</>)}
    </Badge>
  );
}

// --- components -------------------------------------------------------------
function RoomRow({ room, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full text-left rounded-xl p-3 hover:bg-muted/50 transition ${active ? "bg-muted/60" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {room.kind === "instrument" ? <Hash className="h-4 w-4" /> : <Radio className="h-4 w-4" />}
          <span className="text-sm font-medium">{room.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <VisibilityChip v={room.visibility} />
          <Badge variant="outline" className="text-[10px]">{room.members}</Badge>
        </div>
      </div>
    </button>
  );
}

function Composer({ onPost }) {
  const [text, setText] = useState("");
  const [instrument, setInstrument] = useState(MOCK_INSTRUMENTS[0]);
  const [crossFirm, setCrossFirm] = useState(true);
  const risky = /client|mnpi|deal|restricted/i.test(text);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          Post to Community <Sparkles className="h-4 w-4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="rounded-xl">
                <Hash className="mr-2 h-4 w-4" /> {instrument.label} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Select instrument</DropdownMenuLabel>
              {MOCK_INSTRUMENTS.map((i) => (
                <DropdownMenuItem key={i.id} onClick={() => setInstrument(i)}>
                  {i.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-2 ml-auto">
            <Shield className="h-4 w-4" />
            <span className="text-xs text-muted-foreground">Visibility</span>
            <Switch checked={crossFirm} onCheckedChange={setCrossFirm} />
            <span className="text-xs">{crossFirm ? "Cross-firm" : "Firm-only"}</span>
          </div>
        </div>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Share market color. No MNPI. Tag levels, sizes, axes." className="min-h-[100px] rounded-xl" />
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Shield className="h-3 w-3" />
            {risky ? (
              <span className="text-red-500">Potential MNPI detected. Consider firm-only or redact.</span>
            ) : (
              <span>Market color only. Captured for compliance.</span>
            )}
          </div>
          <Button size="sm" className="rounded-xl" onClick={() => {
            if (!text.trim()) return;
            onPost({
              text,
              instrumentId: instrument.id,
              visibility: crossFirm ? "cross-firm" : "firm-only",
            });
            setText("");
          }}>
            <Send className="mr-2 h-4 w-4" /> Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PostCard({ post, onRFQ, onReact }) {
  const score = useMemo(() => {
    const r = post.reactions.up + post.reactions.insight * 1.2 + post.reactions.agree * 0.8 + post.replies * 0.5;
    const ageMin = (Date.now() - post.ts) / 60000; // minutes
    const tau = 90; // half-life-ish
    return (Math.log(1 + r) * Math.exp(-ageMin / tau)) * 10;
  }, [post]);

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{post.author.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium">{post.author.name} <span className="text-muted-foreground">· {post.author.firm}</span></div>
                <div className="text-xs text-muted-foreground">{timeAgo(post.ts)} ago · {post.author.desk}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">{MOCK_INSTRUMENTS.find(i=>i.id===post.instruments[0])?.label}</Badge>
              <VisibilityChip v={post.visibility} />
              <ScoreChip score={score} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.body}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {(["up","insight","agree"]).map((k)=> (
              <Button key={k} variant="ghost" size="sm" className="rounded-xl" onClick={()=> onReact(post.id, k)}>
                {k === "up" && <TrendingUp className="h-4 w-4 mr-1"/>}
                {k === "insight" && <Eye className="h-4 w-4 mr-1"/>}
                {k === "agree" && <Check className="h-4 w-4 mr-1"/>}
                <span className="text-xs capitalize">{k}</span>
                <span className="ml-1 text-xs text-muted-foreground">{post.reactions[k]}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="rounded-xl" onClick={() => onRFQ(post)}>
              <FileText className="mr-2 h-4 w-4"/> Open RFQ
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl">
              <MessageCircle className="mr-2 h-4 w-4"/> Reply ({post.replies})
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function RightRail({ trending, activeUsers, suggestions }) {
  return (
    <div className="space-y-4">
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><Flame className="h-4 w-4"/> Trending Instruments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {trending.map((t) => (
            <div key={t.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><Hash className="h-4 w-4"/> {t.label}</div>
              <Badge variant="outline" className="text-[10px]">{t.posts} posts</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><Users2 className="h-4 w-4"/> Who's Active</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {activeUsers.map((u) => (
            <div key={u.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6"><AvatarFallback>{u.initials}</AvatarFallback></Avatar>
                <span>{u.name}</span>
              </div>
              <Badge variant={u.online ? "default" : "secondary"} className="text-[10px]">{u.firm}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><Building2 className="h-4 w-4"/> Suggested Rooms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {suggestions.map((r)=> (
            <div key={r.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2"><Radio className="h-4 w-4"/> {r.name}</div>
              <Button size="icon" variant="ghost" className="h-6 w-6 rounded-xl"><Plus className="h-4 w-4"/></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// --- AI Finder & Profile ----------------------------------------------------
function FinderPanel({ open, onClose, onOpenProfile }) {
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState({ instruments: new Set(["SX5E"]), markets: new Set(["EU"]), style: new Set() });

  const results = useMemo(() => {
    const text = query.toLowerCase();
    return [...MOCK_USERS]
      .map((u) => {
        let score = u.overlap || 0;
        if (sel.instruments.size) score += [...sel.instruments].filter((x) => (u.instruments||[]).includes(x)).length * 0.08;
        if (sel.markets.size) score += [...sel.markets].filter((x) => (u.markets||[]).includes(x)).length * 0.05;
        if (sel.style.size && sel.style.has(u.style)) score += 0.06;
        if (text && ((u.bio||"").toLowerCase().includes(text) || (u.role||"").toLowerCase().includes(text) || (u.desk||"").toLowerCase().includes(text))) score += 0.05;
        return { ...u, _score: score };
      })
      .sort((a, b) => b._score - a._score);
  }, [query, sel]);

  const toggle = (group, item) =>
    setSel((s) => {
      const copy = new Set(s[group]);
      copy.has(item) ? copy.delete(item) : copy.add(item);
      return { ...s, [group]: copy };
    });

  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[720px] rounded-2xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>AI People Finder</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 space-y-3">
            <Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Describe: dispersion traders EU, TRF, conservative" className="rounded-xl"/>
            <Card className="rounded-2xl">
              <CardHeader className="pb-2"><CardTitle className="text-sm">Filters</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div>
                  <div className="mb-1 text-muted-foreground">Instruments</div>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.instruments.map(t => (
                      <Button key={t} size="sm" variant={sel.instruments.has(t)?"default":"outline"} className="rounded-full h-7" onClick={()=>toggle('instruments',t)}>{t}</Button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-muted-foreground">Markets</div>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.markets.map(t => (
                      <Button key={t} size="sm" variant={sel.markets.has(t)?"default":"outline"} className="rounded-full h-7" onClick={()=>toggle('markets',t)}>{t}</Button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-muted-foreground">Risk Profile</div>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.style.map(t => (
                      <Button key={t} size="sm" variant={sel.style.has(t)?"default":"outline"} className="rounded-full h-7" onClick={()=>toggle('style',t)}>{t}</Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-muted-foreground mb-2">{results.length} results · ranked by overlap + filters</div>
            <ScrollArea className="h-[48vh] pr-2">
              <div className="space-y-2">
                {results.map(u => (
                  <Card key={u.id} className="rounded-2xl hover:bg-muted/50 transition">
                    <CardContent className="p-4 flex items-start gap-3">
                      <Avatar className="h-8 w-8"><AvatarFallback>{u.initials}</AvatarFallback></Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="font-medium truncate">{u.name}</div>
                          <Badge variant="outline">{u.firm}</Badge>
                          <Badge variant="secondary">{u.role}</Badge>
                          <Badge variant="outline">Score {(u.overlap*100).toFixed(0)}</Badge>
                          <Badge variant="outline">Active {u.activity}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{u.bio}</div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {(u.instruments||[]).map(t => (<Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>))}
                        </div>
                      </div>
                      <Button size="sm" className="rounded-xl" onClick={()=> onOpenProfile(u)}>Open</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProfileSheet({ profile, onClose }) {
  if (!profile) return null;
  return (
    <Dialog open={!!profile} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10"><AvatarFallback>{profile.initials}</AvatarFallback></Avatar>
          <div>
            <div className="font-medium">{profile.name}</div>
            <div className="text-xs text-muted-foreground">{profile.firm} • {profile.role}</div>
            <div className="text-xs text-muted-foreground mt-1">Timezone {profile.timezone}</div>
          </div>
        </div>
        <div className="text-sm mt-2">{profile.bio}</div>
        <div className="mt-2 flex flex-wrap gap-1">
          {(profile.instruments||[]).map(t => (<Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>))}
          {(profile.markets||[]).map(t => (<Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>))}
          <Badge variant="outline" className="text-[10px]">{profile.style}</Badge>
        </div>
        <div className="flex gap-2 mt-3">
          <Button variant="outline" className="rounded-xl">Follow</Button>
          <Button className="rounded-xl">Message</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- main prototype ---------------------------------------------------------
export default function CommunityPrototype() {
  const [rooms, setRooms] = useState(MOCK_ROOMS);
  const [activeRoom, setActiveRoom] = useState(rooms[0].id);
  const [posts, setPosts] = useState(seedPosts());
  const [search, setSearch] = useState("");
  const [rfq, setRfq] = useState(null);
  const [openFinder, setOpenFinder] = useState(false);
  const [profile, setProfile] = useState(null);

  const filteredRooms = rooms.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  const roomPosts = posts.filter(p => p.roomId === activeRoom).sort((a,b)=> b.ts - a.ts);

  const trending = useMemo(() => {
    const count = {};
    posts.forEach(p => {
      (p.instruments || []).forEach(i => { count[i] = (count[i]||0)+1; });
    });
    return MOCK_INSTRUMENTS.map(i => ({ id:i.id, label:i.label, posts: count[i.id]||0 }))
      .sort((a,b)=> b.posts - a.posts);
  }, [posts]);

  const handlePost = ({ text, instrumentId, visibility }) => {
    const author = MOCK_USERS[3];
    const p = {
      id: `m${Math.random().toString(36).slice(2,8)}`,
      roomId: activeRoom,
      author,
      body: text,
      instruments: [instrumentId],
      visibility,
      ts: Date.now(),
      reactions: { up: 0, insight: 0, agree: 0 },
      replies: 0,
    };
    setPosts([p, ...posts]);
  };

  const handleReact = (id, key) => {
    setPosts((prev) => prev.map(p => p.id===id ? { ...p, reactions: { ...p.reactions, [key]: p.reactions[key]+1 } } : p));
  };

  return (
    <TooltipProvider>
      <div className="w-full h-full grid grid-cols-12 gap-4 p-4 bg-background text-foreground">
        {/* Left rail */}
        <aside className="col-span-3 xl:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search rooms, people" className="rounded-xl" />
            <Button variant="secondary" size="icon" className="rounded-xl"><Search className="h-4 w-4"/></Button>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={()=> setOpenFinder(true)}>AI Find People</Button>
          </div>
          <Tabs defaultValue="rooms">
            <TabsList className="grid grid-cols-2 rounded-xl">
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="directory">Directory</TabsTrigger>
            </TabsList>
            <TabsContent value="rooms">
              <ScrollArea className="h-[68vh] pr-2">
                <div className="space-y-1 mt-2">
                  {filteredRooms.map((r) => (
                    <RoomRow key={r.id} room={r} active={activeRoom===r.id} onClick={()=> setActiveRoom(r.id)} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="directory">
              <Card className="rounded-2xl">
                <CardHeader className="pb-2"><CardTitle className="text-sm">Discover firms & traders</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {MOCK_USERS.map(u => (
                    <div key={u.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback>{u.initials}</AvatarFallback></Avatar>
                        <div>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-muted-foreground text-xs">{u.firm} · {u.desk}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl">Follow</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Center column */}
        <main className="col-span-6 xl:col-span-7">
          <Composer onPost={handlePost} />

          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <BellRing className="h-4 w-4" /> Ranked by engagement & recency · {roomPosts.length} posts
            </div>
            <Button variant="ghost" size="sm" className="rounded-xl">Subscribe</Button>
          </div>

          <AnimatePresence>
            <div className="space-y-3">
              {roomPosts.map(p => (
                <PostCard key={p.id} post={p} onRFQ={setRfq} onReact={handleReact} />
              ))}
            </div>
          </AnimatePresence>
        </main>

        {/* Right rail */}
        <aside className="col-span-3 xl:col-span-3">
          <RightRail trending={trending} activeUsers={MOCK_USERS} suggestions={rooms.filter(r=>r.id!==activeRoom).slice(0,3)} />
        </aside>
      </div>

      {/* RFQ modal */}
      <Dialog open={!!rfq} onOpenChange={() => setRfq(null)}>
        <DialogContent className="rounded-2xl sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5"/> Create RFQ from post
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">You are converting community color into a structured RFQ. Edit details before sending to your OMS.</div>
            <div className="text-sm">
              <div className="font-medium mb-1">Instrument</div>
              <Input readOnly value={MOCK_INSTRUMENTS.find(i=>i.id===rfq?.instruments?.[0])?.label || ""} className="rounded-xl" />
            </div>
            <div className="text-sm">
              <div className="font-medium mb-1">Context</div>
              <Textarea readOnly value={rfq?.body || ""} className="rounded-xl min-h-[100px]" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="font-medium mb-1">Side</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button variant="outline" className="w-full rounded-xl">Select side <ChevronDown className="ml-2 h-4 w-4"/></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-full">
                    <DropdownMenuItem>Buy</DropdownMenuItem>
                    <DropdownMenuItem>Sell</DropdownMenuItem>
                    <DropdownMenuItem>Two-way</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <div className="font-medium mb-1">Size</div>
                <Input placeholder="e.g. 2.5M" className="rounded-xl" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" className="rounded-xl" onClick={()=> setRfq(null)}>Cancel</Button>
            <Button className="rounded-xl"><Send className="mr-2 h-4 w-4"/> Send to OMS</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI People Finder & Profile */}
      <FinderPanel open={openFinder} onClose={()=> setOpenFinder(false)} onOpenProfile={setProfile} />
      <ProfileSheet profile={profile} onClose={()=> setProfile(null)} />
    </TooltipProvider>
  );
}
