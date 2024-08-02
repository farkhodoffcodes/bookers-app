import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import History from "@/helpers/state_managment/history";
import NavigationMenu from "@/components/navigation/navigation-menu";
import axios from "axios";
import { base_url, getFile } from "@/helpers/api";
import moment from "moment";
import { addFeedbackMaster, sliceTextFullName } from "@/helpers/api-function/client/client";
import Textarea from "@/components/select/textarea";
import CenteredModal from "@/components/(modals)/modal-centered";
import clientStore from "@/helpers/state_managment/client/clientStore";
import { getConfig } from "@/app/(tabs)/(master)/main";
import ContactInformation from "@/components/contact-information/contact-information";
import HistoryCard from "@/components/(cards)/history-card";

const CenseledSession = () => {
    const { product } = History();
    const [me, setMe] = useState({});
    const [textVal, setTextVal] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [isFeedback, setIsFeedback] = useState(false);
    const { isLoading, setIsLoading } = clientStore();

    const toggleFeedback = () => setIsFeedback(!isFeedback);

    const rejected = async () => {
        try {
            const config = await getConfig();
            await axios.put(`${base_url}order/confirm-order?orderId=${product.id}&status=REJECTED`, '', config ? config : {});
        } catch (error) {
            console.log(error);
        }
    };

    const handleRating = (value: number) => setRating(value);

    const completed = async () => {
        try {
            const config = await getConfig();
            await axios.put(`${base_url}order/confirm-order?orderId=${product.id}&status=CONFIRMED`, '', config ? config : {});
        } catch (error) {
            console.log(error);
        }
    };

    const checkStatus = () => {
        if (product.orderStatus === "WAIT") {
            return (
                <View style={tw`flex-row`}>
                    <TouchableOpacity
                        onPress={rejected}
                        activeOpacity={0.8}
                        style={[
                            tw`py-1 px-2 border rounded-lg`,
                            { borderColor: "#9c0935" },
                        ]}
                    >
                        <Text style={[{ color: "#9c0935", borderColor: "#9c0935" }]}>
                            Отменён
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={completed}
                        activeOpacity={0.8}
                        style={[
                            tw`py-1 px-2 rounded-lg ml-2`,
                            { backgroundColor: "#9c0935" },
                        ]}
                    >
                        <Text style={tw`text-white`}>Принять</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (product.orderStatus === "MASTER_REJECTED") {
            return (
                <TouchableOpacity
                    onPress={rejected}
                    activeOpacity={0.8}
                    style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#9c0935" }]}
                >
                    <Text style={[{ color: "#9c0935", borderColor: "#9c0935" }]}>
                        Отменён
                    </Text>
                </TouchableOpacity>
            );
        } else if (product.orderStatus === "CLIENT_REJECTED") {
            return (
                <TouchableOpacity
                    onPress={rejected}
                    activeOpacity={0.8}
                    style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#9c0935" }]}
                >
                    <Text style={[{ color: "#9c0935", borderColor: "#9c0935" }]}>
                        Отменён
                    </Text>
                </TouchableOpacity>
            );
        } else if (product.orderStatus === "COMPLETED") {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#00A1D3" }]}
                >
                    <Text style={[{ color: "#00A1D3" }]}>Выполнен</Text>
                </TouchableOpacity>
            );
        } else if (product.orderStatus === "MASTER_CONFIRMED") {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#217355" }]}
                >
                    <Text style={[{ color: "#217355" }]}>Одобрено</Text>
                </TouchableOpacity>
            );
        } else if (product.orderStatus === "CLIENT_CONFIRMED") {
            return (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[tw`py-1 px-2 border rounded-lg`, { borderColor: "#217355" }]}
                >
                    <Text style={[{ color: "#217355" }]}>Одобрено</Text>
                </TouchableOpacity>
            );
        }
    };

    const checkAdditionally = () => {
        if (product.orderStatus === "WAIT") {
            return null;
        } else if (product.orderStatus === "COMPLETED") {
            return (
                <TouchableOpacity
                    onPress={toggleFeedback}
                    activeOpacity={0.8}
                    style={[tw`py-2 rounded-lg `, { backgroundColor: '#B9B9C9' }]}
                >
                    <Text
                        style={[
                            tw`text-center text-lg`,
                            { color: "#9c0935", borderColor: "#9c0935" },
                        ]}
                    >
                        Оставить отзыв
                    </Text>
                </TouchableOpacity>
            );
        } else if (product.orderStatus === "MASTER_CONFIRMED") {
            return (
                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[tw`py-2 rounded-lg flex-row items-center bg-gray-300 px-3`]}
                    >
                        <FontAwesome name="arrows" size={24} color="#9C0A35" />
                        <Text style={[tw`font-bold text-lg ml-2`]}>Передвинуть</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={rejected}
                        activeOpacity={0.8}
                        style={[
                            tw`py-2 rounded-lg mt-2 bg-gray-300 flex-row items-center px-3`,
                        ]}
                    >
                        <AntDesign name="closecircleo" size={24} color="#9C0A35" />
                        <Text style={[tw`font-bold text-lg ml-2`]}>Отменить</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (product.orderStatus === "CLIENT_CONFIRMED") {
            return (
                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[tw`py-2 rounded-lg flex-row items-center bg-gray-300 px-3`]}
                    >
                        <FontAwesome name="arrows" size={24} color="#9C0A35" />
                        <Text style={[tw`font-bold text-lg ml-2`]}>Передвинуть</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={rejected}
                        activeOpacity={0.8}
                        style={[
                            tw`py-2 rounded-lg mt-2 bg-gray-300 flex-row items-center px-3`,
                        ]}
                    >
                        <AntDesign name="closecircleo" size={24} color="#9C0A35" />
                        <Text style={[tw`font-bold text-lg ml-2`]}>Отменить</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (product.orderStatus === "MASTER_REJECTED") {
            return (
                <TouchableOpacity
                    onPress={toggleFeedback}
                    activeOpacity={0.8}
                    style={[tw`py-2 rounded-lg bg-white`]}
                >
                    <Text
                        style={[
                            tw`text-center text-lg`,
                            { color: "#9c0935", borderColor: "#9c0935" },
                        ]}
                    >
                        Оставить отзыв
                    </Text>
                </TouchableOpacity>
            );
        } else if (product.orderStatus === "CLIENT_REJECTED") {
            return (
                <TouchableOpacity
                    onPress={toggleFeedback}
                    activeOpacity={0.8}
                    style={[tw`py-2 rounded-lg bg-white`]}
                >
                    <Text
                        style={[
                            tw`text-center text-lg`,
                            { color: "#9c0935", borderColor: "#9c0935" },
                        ]}
                    >
                        Оставить отзыв
                    </Text>
                </TouchableOpacity>
            );
        }
    };

    const getMe = async () => {
        try {
            const config = await getConfig();
            const { data } = await axios.get(`${base_url}user/me`, config ? config : {});
            setMe(data.body);
        } catch (error) {
            console.log(error);
        }
    };

    const statusName = (statusN: string) => {
        if (statusN === 'CLIENT_CONFIRMED' || statusN === 'MASTER_CONFIRMED') return 'Одобрено'
        else if (statusN === 'COMPLETED') return 'Выполнен'
        else if (statusN === 'CLIENT_REJECTED' || statusN === 'MASTER_REJECTED') return 'Отменён'
        else if (statusN === 'WAIT') return 'Ждать'
    }

    useEffect(() => {
        getMe();
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 16,
                flexGrow: 1,
                justifyContent: "space-between",
                backgroundColor: "#21212E",
            }}
        >
            <View style={tw`mt-5`}>
                <NavigationMenu name="" />
            </View>
            <View
                style={[styles.profileContainer, { borderRadius: 20 }, tw`mt-2 p-3`]}
            >
                <Image
                    source={product.attachmentId ? { uri: `${getFile}${product.attachmentId}` } : require("../../assets/avatar.png")}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{sliceTextFullName(product.fullName)}</Text>
                    <Text style={styles.profilePhone}>{product.phone}</Text>
                </View>
            </View>

            <View style={[styles.buttonsContainer, tw`p-3`]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {product.serviceName.trim().split(", ").map((item: string) => (
                        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <HistoryCard
                name={moment(product.orderDate).format(
                    `dd, ${product.orderDate.slice(5, 7)}, MMMM`
                )}
                description={`Длительность - ${product.serviceHour} час`}
                btnOrText
                statusName={`${product.startTime.slice(0, 5)} - ${product.finishTime.slice(0, 5)}`}
            />

           <View style={tw`my-5`}>
           <HistoryCard
                name={"Стоимость:"}
                btnOrText
                statusName={`${product.toPay} сум`}
            />
           </View>

            <HistoryCard
                name={"Статус:"}
                btnOrText={false}
                statusName={statusName(product.orderStatus)}
                orderStatus={product.orderStatus}
            />

            <View style={{ marginTop: 16, marginBottom: 8 }}>
                <ContactInformation />
            </View>
            <View style={tw`flex-1`}>
                {product.orderStatus !== "WAIT" && (
                    <Text style={styles.contactTitle}>Дополнительно</Text>
                )}
                {checkAdditionally()}
            </View>
            {/* Feedback modal */}
            <CenteredModal
                isFullBtn={false}
                isModal={isFeedback}
                btnWhiteText={isLoading ? "loading..." : `Отправить`}
                btnRedText={`Закрыть`}
                onConfirm={() =>
                    addFeedbackMaster(rating, setIsLoading, toggleFeedback, textVal)
                }
                toggleModal={() => {
                    toggleFeedback();
                    setRating(0);
                }}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.message}>Оцените клиента!</Text>
                    <View style={styles.stars}>
                        {Array(5)
                            .fill(0)
                            .map((_, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={index}
                                    onPress={() => handleRating(index + 1)}
                                >
                                    <AntDesign
                                        name={index < rating ? "star" : "staro"}
                                        size={30}
                                        color="#B00000"
                                        style={styles.star}
                                    />
                                </TouchableOpacity>
                            ))}
                    </View>
                    <Textarea
                        placeholder={`Оставить отзыв`}
                        value={textVal}
                        onChangeText={(e) => setTextVal(e)}
                    />
                </View>
            </CenteredModal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#2b2d42",
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "#B9B9C9"
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    profileInfo: {
        justifyContent: "center",
    },
    profileName: {
        color: "#000",
        fontSize: 18,
        fontWeight: "900",
    },
    profilePhone: {
        color: "#8d99ae",
        fontSize: 14,
    },
    buttonsContainer: {
        marginBottom: 16,
        backgroundColor: '#B9B9C9',
        borderRadius: 20,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderColor: "#828282",
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        marginVertical: 10
    },
    detailsContainer: {
        marginBottom: 16,
        backgroundColor: 'B9B9C9'

    },
    detailText: {
        color: "#000",
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "900",
    },
    detailTime: {
        color: "#9c0935",
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "900",
    },
    detailCost: {
        color: "#000",
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "900",
    },
    detailStatus: {
        color: "#edf2f4",
        fontSize: 16,
    },
    statusCancelled: {
        color: "#ef233c",
    },
    contactContainer: {
        marginBottom: 16,
    },
    contactTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "900",
        marginBottom: 8,
        marginTop: 10,
    },
    contactInfo: {
        color: "#8d99ae",
        fontSize: 16,
        marginBottom: 4,
    },
    reviewButton: {
        padding: 12,
        backgroundColor: "#8d99ae",
        borderRadius: 5,
        alignItems: "center",
    },
    reviewText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "900",
    },
    modalContainer: {
        borderRadius: 10,
        alignItems: "center",
    },
    message: {
        fontSize: 18,
        color: "#FFFFFF",
        marginVertical: 20,
        textAlign: "center",
        opacity: 0.7,
    },
    stars: {
        flexDirection: "row",
        marginBottom: 20,
    },
    star: {
        marginHorizontal: 5,
    },
});

export default CenseledSession;
