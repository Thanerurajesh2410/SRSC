import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";

interface TopDonor {
    donorName: string;
    totalAmount: number;
}

interface TopDonorsProps {
    donors: TopDonor[];
}

export default function TopDonors({
    donors,
}: TopDonorsProps) {
    return (
        <Card
            elevation={2}
            sx={{
                height: "100%",
                borderRadius: 3,
            }}
        >
            <CardHeader title="Top Donors" />

            <CardContent sx={{ p: 0 }}>
                {donors.length === 0 ? (
                    <Box
                        sx={{
                            py: 6,
                            textAlign: "center",
                        }}
                    >
                        <Typography color="text.secondary">
                            No donor data available.
                        </Typography>
                    </Box>
                ) : (
                    <List disablePadding>
                        {donors.map((donor, index) => (
                            <Box key={index}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {donor.donorName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText
                                        primary={donor.donorName}
                                        secondary={`Rank #${index + 1}`}
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 700,
                                        }}
                                    >
                                        ₹
                                        {donor.totalAmount.toLocaleString(
                                            "en-IN"
                                        )}
                                    </Typography>
                                </ListItem>

                                {index !== donors.length - 1 && (
                                    <Divider />
                                )}
                            </Box>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
}