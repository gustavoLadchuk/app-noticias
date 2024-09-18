import Card from "@/components/Card";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
    searchHeader: {
        height: 60,
        width: "100%",
        backgroundColor: "black",
        borderColor: "gray",
        borderBottomWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    input: {
        backgroundColor: "black",
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 3,
        height: "70%",
        width: "80%",
        color: "white",
        fontSize: 18,
        paddingHorizontal: 5
    },
    newsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    listContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    item: {
        marginVertical: 10
    },
})

type noticias = {
    publishedAt: string
    title: string
    description: string
    url: string
    urlToImage: string
}

const index = () => {

    const [noticias, setNoticias] = useState<noticias[]>()

    const [input, setInput] = useState("")

    const getNoticias = async () => {
        const response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=9abf29507b774cf1a5c74f39f3cfce86")
        setNoticias(response.data.articles)
    }

    const handleSearchButton = async () => {
        if (input) {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${input}&apiKey=9abf29507b774cf1a5c74f39f3cfce86`)
            setNoticias(response.data.articles)
        }
    }

    useEffect(() => {
        getNoticias()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.searchHeader}>
                <TextInput style={styles.input} onChangeText={setInput} value={input} />

                <Pressable onPress={handleSearchButton}>
                    <FontAwesome name="search" size={30} color={'white'} />
                </Pressable>
            </View>
            <View style={styles.newsContainer}>
                <FlatList
                    data={noticias}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                title={item.title}
                                publishedAt={item.publishedAt}
                                description={item.description}
                                url={item.url}
                                urlToImage={item.urlToImage}
                                key={index}
                            />
                        )
                    }}
                />
            </View>



        </SafeAreaView>
    );
}

export default index;