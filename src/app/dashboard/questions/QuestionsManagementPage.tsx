"use client";

import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

type Category = "Chung" | "Soft Skills" | "Technical";
type Difficulty = "Dễ" | "Trung bình" | "Khó";

type QuestionItem = {
  id: string;
  question: string;
  category: Category;
  difficulty: Difficulty;
  usedCount: number;
  aiScore: number; // 0-100
};

const MOCK_QUESTIONS: QuestionItem[] = [
  { id: "q1", question: "Giới thiệu về bản thân", category: "Chung", difficulty: "Dễ", usedCount: 1247, aiScore: 95 },
  { id: "q2", question: "Kinh nghiệm làm việc nhóm", category: "Soft Skills", difficulty: "Trung bình", usedCount: 892, aiScore: 92 },
  { id: "q3", question: "Giải thuật sắp xếp nhanh", category: "Technical", difficulty: "Khó", usedCount: 456, aiScore: 88 },
  { id: "q4", question: "Xử lý xung đột trong team", category: "Soft Skills", difficulty: "Trung bình", usedCount: 734, aiScore: 90 },
  { id: "q5", question: "Thiết kế hệ thống phân tán", category: "Technical", difficulty: "Khó", usedCount: 321, aiScore: 85 },
];

/** SVG icon tự viết để khỏi cần @mui/icons-material */
function SvgIcon({
                   children,
                   size = 18,
                 }: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <Box component="svg" viewBox="0 0 24 24" sx={{ width: size, height: size, display: "block" }}>
      {children}
    </Box>
  );
}

function IconPlus() {
  return (
    <SvgIcon>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
  );
}

function IconEdit() {
  return (
    <SvgIcon>
      <path
        d="M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.12L16.62 5.5a1.5 1.5 0 0 0-2.12 0L4 16v4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );
}

function IconTrash() {
  return (
    <SvgIcon>
      <path
        d="M6 7h12M10 7V5h4v2m-7 0l1 14h8l1-14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </SvgIcon>
  );
}

function CategoryChip({ category }: { category: Category }) {
  // Tông xanh giống ảnh
  return (
    <Chip
      size="small"
      label={category}
      sx={{
        borderRadius: 999,
        bgcolor: "rgba(59,130,246,0.12)",
        color: "rgb(37,99,235)",
        fontWeight: 800,
      }}
    />
  );
}

function DifficultyChip({ difficulty }: { difficulty: Difficulty }) {
  if (difficulty === "Dễ") {
    return (
      <Chip
        size="small"
        label="Dễ"
        sx={{
          borderRadius: 999,
          bgcolor: "rgba(16,185,129,0.12)",
          color: "rgb(5,150,105)",
          fontWeight: 900,
        }}
      />
    );
  }
  if (difficulty === "Trung bình") {
    return (
      <Chip
        size="small"
        label="Trung bình"
        sx={{
          borderRadius: 999,
          bgcolor: "rgba(245,158,11,0.14)",
          color: "rgb(180,83,9)",
          fontWeight: 900,
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label="Khó"
      sx={{
        borderRadius: 999,
        bgcolor: "rgba(244,63,94,0.12)",
        color: "rgb(225,29,72)",
        fontWeight: 900,
      }}
    />
  );
}

function ScoreBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 170 }}>
      <Box
        sx={{
          width: 110,
          height: 8,
          borderRadius: 999,
          bgcolor: "rgba(226,232,240,1)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${v}%`,
            height: "100%",
            borderRadius: 999,
            bgcolor: "rgb(16,185,129)",
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 700 }}>
        {v}%
      </Typography>
    </Stack>
  );
}

export default function QuestionsManagementPage() {
  const [items, setItems] = React.useState<QuestionItem[]>(MOCK_QUESTIONS);

  // Filter
  const [categoryFilter, setCategoryFilter] = React.useState<"all" | Category>("all");

  const filtered = React.useMemo(() => {
    if (categoryFilter === "all") return items;
    return items.filter((x) => x.category === categoryFilter);
  }, [items, categoryFilter]);

  // Dialogs
  const [openForm, setOpenForm] = React.useState(false);
  const [formMode, setFormMode] = React.useState<"create" | "edit">("create");
  const [editing, setEditing] = React.useState<QuestionItem | null>(null);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleting, setDeleting] = React.useState<QuestionItem | null>(null);

  // Form state
  const [question, setQuestion] = React.useState("");
  const [category, setCategory] = React.useState<Category>("Chung");
  const [difficulty, setDifficulty] = React.useState<Difficulty>("Dễ");
  const [usedCount, setUsedCount] = React.useState<number>(0);
  const [aiScore, setAiScore] = React.useState<number>(90);

  function openCreate() {
    setFormMode("create");
    setEditing(null);
    setQuestion("");
    setCategory("Chung");
    setDifficulty("Dễ");
    setUsedCount(0);
    setAiScore(90);
    setOpenForm(true);
  }

  function openEdit(item: QuestionItem) {
    setFormMode("edit");
    setEditing(item);
    setQuestion(item.question);
    setCategory(item.category);
    setDifficulty(item.difficulty);
    setUsedCount(item.usedCount);
    setAiScore(item.aiScore);
    setOpenForm(true);
  }

  function submitForm() {
    const q = question.trim();
    if (!q) return alert("Vui lòng nhập nội dung câu hỏi.");

    const payload = {
      question: q,
      category,
      difficulty,
      usedCount: Math.max(0, Number(usedCount) || 0),
      aiScore: Math.max(0, Math.min(100, Number(aiScore) || 0)),
    };

    if (formMode === "create") {
      const newItem: QuestionItem = { id: `q_${Date.now()}`, ...payload };
      setItems((prev) => [newItem, ...prev]);
    } else if (formMode === "edit" && editing) {
      setItems((prev) => prev.map((x) => (x.id === editing.id ? { ...x, ...payload } : x)));
    }

    setOpenForm(false);
  }

  function openDeleteConfirm(item: QuestionItem) {
    setDeleting(item);
    setOpenDelete(true);
  }

  function confirmDelete() {
    if (!deleting) return;
    setItems((prev) => prev.filter((x) => x.id !== deleting.id));
    setOpenDelete(false);
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Quản lý Câu hỏi
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
            Quản lý ngân hàng câu hỏi phỏng vấn AI
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<IconPlus />}
          onClick={openCreate}
          sx={{
            bgcolor: "rgb(16,185,129)",
            "&:hover": { bgcolor: "rgb(5,150,105)" },
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 900,
            px: 2,
            py: 1.1,
          }}
        >
          Thêm câu hỏi
        </Button>
      </Stack>

      {/* Card */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: "rgba(226,232,240,1)",
          overflow: "hidden",
        }}
      >
        {/* Filter row */}
        <Box sx={{ p: 2 }}>
          <FormControl sx={{ minWidth: 190 }}>
            <Select
              size="small"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              sx={{ borderRadius: 2.5, height: 40 }}
            >
              <MenuItem value="all">Tất cả danh mục</MenuItem>
              <MenuItem value="Chung">Chung</MenuItem>
              <MenuItem value="Soft Skills">Soft Skills</MenuItem>
              <MenuItem value="Technical">Technical</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 980 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Câu hỏi
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Danh mục
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Độ khó
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Lượt dùng
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  AI Score
                </TableCell>
                <TableCell sx={{ px: 3, py: 2, fontSize: 12, fontWeight: 900, color: "text.secondary" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
                    Không có câu hỏi phù hợp bộ lọc.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((x) => (
                  <TableRow key={x.id} hover sx={{ "& td": { borderTop: "1px solid rgba(241,245,249,1)" } }}>
                    <TableCell sx={{ px: 3, py: 2, fontWeight: 700, color: "text.primary" }}>
                      {x.question}
                    </TableCell>

                    <TableCell sx={{ px: 3, py: 2 }}>
                      <CategoryChip category={x.category} />
                    </TableCell>

                    <TableCell sx={{ px: 3, py: 2 }}>
                      <DifficultyChip difficulty={x.difficulty} />
                    </TableCell>

                    <TableCell sx={{ px: 3, py: 2, color: "text.secondary", fontWeight: 700 }}>
                      {x.usedCount}
                    </TableCell>

                    <TableCell sx={{ px: 3, py: 2 }}>
                      <ScoreBar value={x.aiScore} />
                    </TableCell>

                    <TableCell sx={{ px: 3, py: 2 }}>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Sửa">
                          <IconButton onClick={() => openEdit(x)} sx={{ color: "rgb(37,99,235)" }}>
                            <IconEdit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Xoá">
                          <IconButton onClick={() => openDeleteConfirm(x)} sx={{ color: "rgb(225,29,72)" }}>
                            <IconTrash />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>

        <Divider />
        <Box sx={{ px: 3, py: 2 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Hiển thị 1-{filtered.length} trong tổng số {filtered.length} câu hỏi
          </Typography>
        </Box>
      </Card>

      {/* Dialog Create/Edit */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 950 }}>
          {formMode === "create" ? "Thêm câu hỏi" : "Sửa câu hỏi"}
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Câu hỏi"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              fullWidth
              multiline
              minRows={2}
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <FormControl fullWidth>
                <Typography variant="caption" sx={{ mb: 0.5, color: "text.secondary" }}>
                  Danh mục
                </Typography>
                <Select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                  <MenuItem value="Chung">Chung</MenuItem>
                  <MenuItem value="Soft Skills">Soft Skills</MenuItem>
                  <MenuItem value="Technical">Technical</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <Typography variant="caption" sx={{ mb: 0.5, color: "text.secondary" }}>
                  Độ khó
                </Typography>
                <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                  <MenuItem value="Dễ">Dễ</MenuItem>
                  <MenuItem value="Trung bình">Trung bình</MenuItem>
                  <MenuItem value="Khó">Khó</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Lượt dùng"
                type="number"
                value={usedCount}
                onChange={(e) => setUsedCount(Number(e.target.value))}
                fullWidth
                inputProps={{ min: 0 }}
              />
              <TextField
                label="AI Score (0-100)"
                type="number"
                value={aiScore}
                onChange={(e) => setAiScore(Number(e.target.value))}
                fullWidth
                inputProps={{ min: 0, max: 100 }}
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenForm(false)} sx={{ textTransform: "none" }}>
            Huỷ
          </Button>
          <Button
            variant="contained"
            onClick={submitForm}
            sx={{
              textTransform: "none",
              fontWeight: 950,
              bgcolor: "rgb(16,185,129)",
              "&:hover": { bgcolor: "rgb(5,150,105)" },
              borderRadius: 2,
            }}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Delete */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 950 }}>Xoá câu hỏi</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "text.secondary" }}>
            Bạn có chắc muốn xoá câu hỏi:{" "}
            <b style={{ color: "#0f172a" }}>{deleting?.question}</b> không?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDelete(false)} sx={{ textTransform: "none" }}>
            Huỷ
          </Button>
          <Button
            variant="contained"
            onClick={confirmDelete}
            sx={{
              textTransform: "none",
              fontWeight: 950,
              bgcolor: "rgb(225,29,72)",
              "&:hover": { bgcolor: "rgb(190,18,60)" },
              borderRadius: 2,
            }}
          >
            Xoá
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
